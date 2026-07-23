import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { DownloadIcon } from "lucide-react";

export default async function DownloadPage() {
  const supabase = await createClient();
  const { data: downloads, error } = await supabase
    .from("downloads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching downloads:", error);
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-primary mb-8">
          Dokumen Unduhan
        </h1>
        <p className="text-center text-muted-foreground">
          Gagal memuat daftar dokumen. Silakan coba lagi nanti.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-primary mb-8">
        Dokumen Unduhan
      </h1>

      {downloads.length === 0 ? (
        <p className="text-center text-muted-foreground">
          Belum ada dokumen yang tersedia untuk diunduh.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {downloads.map((download) => (
            <div
              key={download.id}
              className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold text-primary mb-2">
                  {download.title}
                </h2>
                {download.description && (
                  <p className="text-muted-foreground text-sm mb-4">
                    {download.description}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between mt-4">
                {download.file_url && (
                  <Link
                    href={download.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
                  >
                    <DownloadIcon className="h-4 w-4" /> Unduh File
                  </Link>
                )}
                <span className="text-xs text-muted-foreground">
                  {(download.file_size / 1024).toFixed(2)} KB
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}