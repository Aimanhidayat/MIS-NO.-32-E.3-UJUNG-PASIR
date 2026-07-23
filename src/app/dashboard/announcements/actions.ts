"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function createAnnouncement(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const isActive = formData.get("is_active") === "true";

  if (!title || !content) {
    redirect("/dashboard/announcements/create?message=Judul dan isi pengumuman wajib diisi.");
  }

  const { error } = await supabase.from("announcements").insert({
    title,
    content,
    is_active: isActive,
  });

  if (error) {
    console.error("Error creating announcement:", error);
    redirect("/dashboard/announcements/create?message=Gagal membuat pengumuman.");
  }

  revalidatePath("/dashboard/announcements");
  redirect("/dashboard/announcements");
}

export async function updateAnnouncement(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const isActive = formData.get("is_active") === "true";

  if (!id || !title || !content) {
    redirect(`/dashboard/announcements/${id}/edit?message=Judul dan isi wajib diisi.`);
  }

  const { error } = await supabase
    .from("announcements")
    .update({
      title,
      content,
      is_active: isActive,
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating announcement:", error);
    redirect(`/dashboard/announcements/${id}/edit?message=Gagal memperbarui pengumuman.`);
  }

  revalidatePath("/dashboard/announcements");
  redirect("/dashboard/announcements");
}

export async function deleteAnnouncement(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const id = formData.get("id") as string;

  const { error } = await supabase.from("announcements").delete().eq("id", id);

  if (error) {
    console.error("Error deleting announcement:", error);
    redirect("/dashboard/announcements?message=Gagal menghapus pengumuman.");
  }

  revalidatePath("/dashboard/announcements");
  redirect("/dashboard/announcements");
}