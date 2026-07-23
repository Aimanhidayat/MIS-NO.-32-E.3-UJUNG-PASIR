"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import slugify from "slugify";

export async function createNews(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const author = formData.get("author") as string;
  const imageFile = formData.get("image") as File;

  if (!title || !content || !author) {
    return redirect("/dashboard/news/create?message=Semua field harus diisi.");
  }

  const slug = slugify(title, { lower: true, strict: true });

  let imageUrl: string | null = null;
  if (imageFile && imageFile.size > 0) {
    const filePath = `news/${user.id}/${Date.now()}-${imageFile.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("news")
      .upload(filePath, imageFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Error uploading image:", uploadError);
      return redirect("/dashboard/news/create?message=Gagal mengunggah gambar.");
    }
    imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/news/${filePath}`;
  }

  const { error } = await supabase.from("news").insert({
    title,
    slug,
    content,
    author,
    image_url: imageUrl,
    user_id: user.id,
  });

  if (error) {
    console.error("Error creating news:", error);
    return redirect("/dashboard/news/create?message=Gagal membuat berita.");
  }

  revalidatePath("/dashboard/news");
  redirect("/dashboard/news");
}

export async function updateNews(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const author = formData.get("author") as string;
  const imageFile = formData.get("image") as File;
  const existingImageUrl = formData.get("existing_image_url") as string | null;

  if (!id || !title || !content || !author) {
    return redirect(`/dashboard/news/${formData.get("slug")}/edit?message=Semua field harus diisi.`);
  }

  const slug = slugify(title, { lower: true, strict: true });

  let imageUrl: string | null = existingImageUrl;
  if (imageFile && imageFile.size > 0) {
    // Delete old image if it exists
    if (existingImageUrl) {
      const oldPath = existingImageUrl.split("news/")[1];
      await supabase.storage.from("news").remove([oldPath]);
    }

    const filePath = `news/${user.id}/${Date.now()}-${imageFile.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("news")
      .upload(filePath, imageFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Error uploading image:", uploadError);
      return redirect(`/dashboard/news/${slug}/edit?message=Gagal mengunggah gambar.`);
    }
    imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/news/${filePath}`;
  } else if (formData.get("remove_image") === "true") {
    if (existingImageUrl) {
      const oldPath = existingImageUrl.split("news/")[1];
      await supabase.storage.from("news").remove([oldPath]);
    }
    imageUrl = null;
  }

  const { error } = await supabase.from("news").update({
    title,
    slug,
    content,
    author,
    image_url: imageUrl,
  }).eq("id", id);

  if (error) {
    console.error("Error updating news:", error);
    return redirect(`/dashboard/news/${slug}/edit?message=Gagal memperbarui berita.`);
  }

  revalidatePath("/dashboard/news");
  redirect("/dashboard/news");
}

export async function deleteNews(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const id = formData.get("id") as string;

  // Get image URL to delete from storage
  const { data: newsItem, error: fetchError } = await supabase
    .from("news")
    .select("image_url")
    .eq("id", id)
    .single();

  if (fetchError) {
    console.error("Error fetching news item for deletion:", fetchError);
    return redirect("/dashboard/news?message=Gagal menghapus berita.");
  }

  if (newsItem?.image_url) {
    const filePath = newsItem.image_url.split("news/")[1];
    const { error: deleteImageError } = await supabase.storage.from("news").remove([filePath]);
    if (deleteImageError) {
      console.error("Error deleting image from storage:", deleteImageError);
      // Continue with news deletion even if image deletion fails
    }
  }

  const { error } = await supabase.from("news").delete().eq("id", id);

  if (error) {
    console.error("Error deleting news:", error);
    return redirect("/dashboard/news?message=Gagal menghapus berita.");
  }

  revalidatePath("/dashboard/news");
  redirect("/dashboard/news");
}