"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import slugify from "slugify";

export async function createGalleryItem(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const type = formData.get("type") as string;
  const imageFile = formData.get("image") as File;

  if (!title || !type || !imageFile || imageFile.size === 0) {
    redirect("/dashboard/galleries/create?message=Judul, tipe, dan gambar wajib diisi.");
  }

  const slug = slugify(title, { lower: true, strict: true });
  const filePath = `${user.id}/${Date.now()}-${imageFile.name}`;

  const { error: uploadError } = await supabase.storage
    .from("gallery")
    .upload(filePath, imageFile, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    console.error("Error uploading gallery image:", uploadError);
    redirect("/dashboard/galleries/create?message=Gagal mengunggah gambar.");
  }

  const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/gallery/${filePath}`;

  const { error } = await supabase.from("galleries").insert({
    title,
    slug,
    description,
    type,
    image_url: imageUrl,
    user_id: user.id,
  });

  if (error) {
    console.error("Error creating gallery item:", error);
    redirect("/dashboard/galleries/create?message=Gagal membuat item galeri.");
  }

  revalidatePath("/dashboard/galleries");
  redirect("/dashboard/galleries");
}

export async function updateGalleryItem(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const id = formData.get("id") as string;
  const oldSlug = formData.get("slug") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const type = formData.get("type") as string;
  const imageFile = formData.get("image") as File;
  const existingImageUrl = formData.get("existing_image_url") as string;

  if (!id || !title || !type) {
    redirect(`/dashboard/galleries/${oldSlug}/edit?message=Judul dan tipe wajib diisi.`);
  }

  const slug = slugify(title, { lower: true, strict: true });
  let imageUrl: string | null = existingImageUrl || null;

  if (imageFile && imageFile.size > 0) {
    if (existingImageUrl) {
      const oldPath = existingImageUrl.split("/gallery/")[1];
      if (oldPath) await supabase.storage.from("gallery").remove([oldPath]);
    }

    const filePath = `${user.id}/${Date.now()}-${imageFile.name}`;
    const { error: uploadError } = await supabase.storage
      .from("gallery")
      .upload(filePath, imageFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Error uploading gallery image:", uploadError);
      redirect(`/dashboard/galleries/${oldSlug}/edit?message=Gagal mengunggah gambar.`);
    }

    imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/gallery/${filePath}`;
  }

  const { error } = await supabase
    .from("galleries")
    .update({
      title,
      slug,
      description,
      type,
      image_url: imageUrl,
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating gallery item:", error);
    redirect(`/dashboard/galleries/${oldSlug}/edit?message=Gagal memperbarui item galeri.`);
  }

  revalidatePath("/dashboard/galleries");
  redirect("/dashboard/galleries");
}

export async function deleteGalleryItem(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const id = formData.get("id") as string;

  const { data: gallery } = await supabase
    .from("galleries")
    .select("image_url")
    .eq("id", id)
    .single();

  if (gallery?.image_url) {
    const filePath = gallery.image_url.split("/gallery/")[1];
    if (filePath) await supabase.storage.from("gallery").remove([filePath]);
  }

  const { error } = await supabase.from("galleries").delete().eq("id", id);

  if (error) {
    console.error("Error deleting gallery item:", error);
    redirect("/dashboard/galleries?message=Gagal menghapus item galeri.");
  }

  revalidatePath("/dashboard/galleries");
  redirect("/dashboard/galleries");
}