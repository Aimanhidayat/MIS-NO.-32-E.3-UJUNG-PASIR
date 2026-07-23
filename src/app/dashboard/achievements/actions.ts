"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import slugify from "slugify";

export async function createAchievement(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const title = formData.get("title") as string;
  const student_name = formData.get("student_name") as string;
  const level = formData.get("level") as string;
  const yearStr = formData.get("year") as string;
  const description = formData.get("description") as string;
  const imageFile = formData.get("image") as File;

  if (!title || !student_name || !level || !yearStr || !description) {
    redirect("/dashboard/achievements/create?message=Semua field harus diisi.");
  }

  const year = parseInt(yearStr, 10);
  if (isNaN(year)) {
    redirect("/dashboard/achievements/create?message=Tahun harus berupa angka.");
  }

  let imageUrl: string | null = null;
  if (imageFile && imageFile.size > 0) {
    const filePath = `${user.id}/${Date.now()}-${imageFile.name}`;
    const { error: uploadError } = await supabase.storage
      .from("achievement")
      .upload(filePath, imageFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Error uploading achievement image:", uploadError);
      redirect("/dashboard/achievements/create?message=Gagal mengunggah gambar.");
    }

    imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/achievement/${filePath}`;
  }

  const { error } = await supabase.from("achievements").insert({
    title,
    student_name,
    level,
    year,
    description,
    image_url: imageUrl,
  });

  if (error) {
    console.error("Error creating achievement:", error);
    redirect("/dashboard/achievements/create?message=Gagal membuat prestasi.");
  }

  revalidatePath("/dashboard/achievements");
  redirect("/dashboard/achievements");
}

export async function updateAchievement(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const student_name = formData.get("student_name") as string;
  const level = formData.get("level") as string;
  const yearStr = formData.get("year") as string;
  const description = formData.get("description") as string;
  const imageFile = formData.get("image") as File;
  const existingImageUrl = formData.get("existing_image_url") as string;

  if (!id || !title || !student_name || !level || !yearStr || !description) {
    redirect(`/dashboard/achievements/${id}/edit?message=Semua field harus diisi.`);
  }

  const year = parseInt(yearStr, 10);
  if (isNaN(year)) {
    redirect(`/dashboard/achievements/${id}/edit?message=Tahun harus berupa angka.`);
  }

  let imageUrl: string | null = existingImageUrl || null;

  if (imageFile && imageFile.size > 0) {
    if (existingImageUrl) {
      const oldPath = existingImageUrl.split("/achievement/")[1];
      if (oldPath) {
        await supabase.storage.from("achievement").remove([oldPath]);
      }
    }

    const filePath = `${user.id}/${Date.now()}-${imageFile.name}`;
    const { error: uploadError } = await supabase.storage
      .from("achievement")
      .upload(filePath, imageFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Error uploading achievement image:", uploadError);
      redirect(`/dashboard/achievements/${id}/edit?message=Gagal mengunggah gambar.`);
    }

    imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/achievement/${filePath}`;
  }

  if (formData.get("remove_image") === "true") {
    if (existingImageUrl) {
      const oldPath = existingImageUrl.split("/achievement/")[1];
      if (oldPath) {
        await supabase.storage.from("achievement").remove([oldPath]);
      }
    }
    imageUrl = null;
  }

  const { error } = await supabase
    .from("achievements")
    .update({
      title,
      student_name,
      level,
      year,
      description,
      image_url: imageUrl,
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating achievement:", error);
    redirect(`/dashboard/achievements/${id}/edit?message=Gagal memperbarui prestasi.`);
  }

  revalidatePath("/dashboard/achievements");
  redirect("/dashboard/achievements");
}

export async function deleteAchievement(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const id = formData.get("id") as string;

  const { data: achievement } = await supabase
    .from("achievements")
    .select("image_url")
    .eq("id", id)
    .single();

  if (achievement?.image_url) {
    const filePath = achievement.image_url.split("/achievement/")[1];
    if (filePath) {
      await supabase.storage.from("achievement").remove([filePath]);
    }
  }

  const { error } = await supabase.from("achievements").delete().eq("id", id);

  if (error) {
    console.error("Error deleting achievement:", error);
    redirect("/dashboard/achievements?message=Gagal menghapus prestasi.");
  }

  revalidatePath("/dashboard/achievements");
  redirect("/dashboard/achievements");
}