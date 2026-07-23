"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import slugify from "slugify";

export async function createDownload(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const file = formData.get("file") as File;

  if (!title || !file || file.size === 0) {
    redirect("/dashboard/downloads/create?message=Judul dan file wajib diisi.");
  }

  const slug = slugify(title, { lower: true, strict: true });
  const filePath = `${user.id}/${Date.now()}-${file.name}`;

  const { error: uploadError } = await supabase.storage
    .from("downloads")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    console.error("Error uploading download file:", uploadError);
    redirect("/dashboard/downloads/create?message=Gagal mengunggah file.");
  }

  const fileUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/downloads/${filePath}`;

  const { error } = await supabase.from("downloads").insert({
    title,
    slug,
    description,
    file_url: fileUrl,
    file_name: file.name,
    file_size: file.size,
    user_id: user.id,
  });

  if (error) {
    console.error("Error creating download:", error);
    redirect("/dashboard/downloads/create?message=Gagal membuat dokumen.");
  }

  revalidatePath("/dashboard/downloads");
  redirect("/dashboard/downloads");
}

export async function updateDownload(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const id = formData.get("id") as string;
  const oldSlug = formData.get("slug") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const file = formData.get("file") as File;
  const existingFileUrl = formData.get("existing_file_url") as string;
  const existingFileName = formData.get("existing_file_name") as string;
  const existingFileSize = Number(formData.get("existing_file_size") || 0);

  if (!id || !title) {
    redirect(`/dashboard/downloads/${oldSlug}/edit?message=Judul wajib diisi.`);
  }

  const slug = slugify(title, { lower: true, strict: true });
  let fileUrl = existingFileUrl;
  let fileName = existingFileName;
  let fileSize = existingFileSize;

  if (file && file.size > 0) {
    if (existingFileUrl) {
      const oldPath = existingFileUrl.split("/downloads/")[1];
      if (oldPath) await supabase.storage.from("downloads").remove([oldPath]);
    }

    const filePath = `${user.id}/${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("downloads")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Error uploading download file:", uploadError);
      redirect(`/dashboard/downloads/${oldSlug}/edit?message=Gagal mengunggah file.`);
    }

    fileUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/downloads/${filePath}`;
    fileName = file.name;
    fileSize = file.size;
  }

  const { error } = await supabase
    .from("downloads")
    .update({
      title,
      slug,
      description,
      file_url: fileUrl,
      file_name: fileName,
      file_size: fileSize,
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating download:", error);
    redirect(`/dashboard/downloads/${oldSlug}/edit?message=Gagal memperbarui dokumen.`);
  }

  revalidatePath("/dashboard/downloads");
  redirect("/dashboard/downloads");
}

export async function deleteDownload(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const id = formData.get("id") as string;

  const { data: download } = await supabase
    .from("downloads")
    .select("file_url")
    .eq("id", id)
    .single();

  if (download?.file_url) {
    const filePath = download.file_url.split("/downloads/")[1];
    if (filePath) await supabase.storage.from("downloads").remove([filePath]);
  }

  const { error } = await supabase.from("downloads").delete().eq("id", id);

  if (error) {
    console.error("Error deleting download:", error);
    redirect("/dashboard/downloads?message=Gagal menghapus dokumen.");
  }

  revalidatePath("/dashboard/downloads");
  redirect("/dashboard/downloads");
}