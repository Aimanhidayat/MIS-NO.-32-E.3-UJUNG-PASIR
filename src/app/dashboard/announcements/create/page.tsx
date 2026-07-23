import Link from "next/link";
import { createAnnouncement } from "../actions";

export const metadata = {
  title: "Tambah Pengumuman | Dashboard Admin",
};

interface CreateAnnouncementPageProps {
  searchParams: Promise<{ message?: string }>;
}

export default async function CreateAnnouncementPage({
  searchParams,
}: CreateAnnouncementPageProps) {
  const { message } = await searchParams;

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
          Tambah Pengumuman
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Buat pengumuman resmi baru untuk ditampilkan di website sekolah.
        </p>
      </div>

      {message ? (
        <div className="rounded-md border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-800">
          {message}
        </div>
      ) : null}

      <form
        action={createAnnouncement}
        className="space-y-5 rounded-xl border bg-white p-6 shadow-sm"
      >
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
            defaultValue="true"
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
            Simpan Pengumuman
          </button>
        </div>
      </form>
    </div>
  );
}