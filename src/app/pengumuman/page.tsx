import { createClient } from "@/utils/supabase/server";

export const metadata = {
  title: "Pengumuman | MIS No. 32/E.3 Ujung Pasir",
  description:
    "Daftar pengumuman resmi MIS No. 32/E.3 Ujung Pasir untuk siswa, orang tua, dan masyarakat.",
};

export default async function PengumumanPage() {
  const supabase = await createClient();

  const { data: announcements, error } = await supabase
    .from("announcements")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching public announcements:", error);
  }

  return (
    <main className="min-h-screen bg-background">
      <section className="bg-primary py-16 text-white">
        <div className="container mx-auto px-4">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-accent">
            Informasi Resmi
          </p>
          <h1 className="font-heading text-4xl font-bold md:text-5xl">
            Pengumuman
          </h1>
          <p className="mt-4 max-w-2xl text-white/85">
            Informasi dan pemberitahuan resmi dari MIS No. 32/E.3 Ujung Pasir.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        {announcements && announcements.length > 0 ? (
          <div className="grid gap-6">
            {announcements.map((announcement) => (
              <article
                key={announcement.id}
                className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    Pengumuman
                  </span>
                  <time className="text-sm text-muted-foreground">
                    {new Date(announcement.created_at).toLocaleDateString(
                      "id-ID",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
                  </time>
                </div>
                <h2 className="font-heading text-2xl font-bold text-gray-900">
                  {announcement.title}
                </h2>
                <p className="mt-4 whitespace-pre-line leading-relaxed text-gray-600">
                  {announcement.content}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">
            <h2 className="font-heading text-2xl font-bold text-gray-900">
              Belum Ada Pengumuman
            </h2>
            <p className="mt-2 text-gray-500">
              Pengumuman resmi sekolah akan ditampilkan di halaman ini.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}