import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { deleteAnnouncement } from "./actions";

export const metadata = {
  title: "Pengumuman | Dashboard Admin",
};

interface AnnouncementsPageProps {
  searchParams: Promise<{ message?: string }>;
}

export default async function AnnouncementsPage({
  searchParams,
}: AnnouncementsPageProps) {
  const { message } = await searchParams;
  const supabase = await createClient();

  const { data: announcements, error } = await supabase
    .from("announcements")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching announcements:", error);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="font-heading text-3xl font-bold text-gray-800">
            Pengumuman
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Kelola pengumuman resmi sekolah yang tampil di website.
          </p>
        </div>
        <Link
          href="/dashboard/announcements/create"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary/90"
        >
          Tambah Pengumuman
        </Link>
      </div>

      {message ? (
        <div className="rounded-md border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-800">
          {message}
        </div>
      ) : null}

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b bg-gray-50 text-sm font-semibold uppercase text-gray-500">
                <th className="p-4">Judul</th>
                <th className="p-4">Isi</th>
                <th className="p-4">Status</th>
                <th className="p-4">Tanggal</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm text-gray-700">
              {announcements && announcements.length > 0 ? (
                announcements.map((announcement) => (
                  <tr
                    key={announcement.id}
                    className="transition-colors hover:bg-gray-50"
                  >
                    <td className="p-4 font-medium text-gray-900">
                      {announcement.title}
                    </td>
                    <td className="max-w-md p-4 text-gray-500">
                      <p className="line-clamp-2">{announcement.content}</p>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          announcement.is_active
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {announcement.is_active ? "Aktif" : "Nonaktif"}
                      </span>
                    </td>
                    <td className="p-4 text-gray-500">
                      {new Date(announcement.created_at).toLocaleDateString(
                        "id-ID",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/dashboard/announcements/${announcement.id}/edit`}
                          className="rounded-md border px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-100"
                        >
                          Edit
                        </Link>
                        <form action={deleteAnnouncement}>
                          <input
                            type="hidden"
                            name="id"
                            value={announcement.id}
                          />
                          <button
                            type="submit"
                            className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-red-700"
                          >
                            Hapus
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    Belum ada data pengumuman.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}