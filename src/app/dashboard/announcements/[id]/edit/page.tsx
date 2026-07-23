import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { updateAnnouncement } from "../../actions";

export const metadata = {
  title: "Edit Pengumuman | Dashboard Admin",
};

interface EditAnnouncementPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ message?: string }>;
}

export default async function EditAnnouncementPage({
  params,
  searchParams,
}: EditAnnouncementPageProps) {
  const { id } = await params;
  const { message } = await searchParams;
  const supabase = await createClient();

  const { data: announcement, error } = await supabase
    .from("announcements")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !announcement) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <Link
          href="/dashboard/announcements"
          className="text-sm font-medium text-primary hover:underline"
        >
          ← Kembali ke Pengumuman
        </Link>
        <h1 className="mt-4 font-heading text-3xl font-bold text-gray-800">
          Edit Pengumuman
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Perbarui isi pengumuman resmi sekolah.
        </p>
      </div>

      {message ? (
        <div className="rounded-md border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-800">
          {message}
        </div>
      ) : null}

      <form
        action={updateAnnouncement}
        className="space-y-5 rounded-xl border bg-white p-6 shadow-sm"
      >
        <input type="hidden" name="id" value={announcement.id} />

        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Judul Pengumuman
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            defaultValue={announcement.title}
            placeholder="Contoh: Jadwal Penilaian Akhir Semester"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Isi Pengumuman
          </label>
          <textarea
            id="content"
            name="content"
            required
            rows={8}
            defaultValue={announcement.content}
            placeholder="Tulis isi pengumuman lengkap di sini..."
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <label
            htmlFor="is_active"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Status
          </label>
          <select
            id="is_active"
            name="is_active"
            defaultValue={announcement.is_active ? "true" : "false"}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
          >
            <option value="true">Aktif / Tampil di Website</option>
            <option value="false">Nonaktif / Simpan sebagai Draft</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Link
            href="/dashboard/announcements"
            className="rounded-md border px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Batal
          </Link>
          <button
            type="submit"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary/90"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
}