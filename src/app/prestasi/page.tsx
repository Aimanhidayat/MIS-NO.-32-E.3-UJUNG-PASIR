import Image from "next/image";
import { Award, CalendarDays } from "lucide-react";
import { createClient } from "@/utils/supabase/server";

export const metadata = {
  title: "Prestasi | MIS No. 32/E.3 Ujung Pasir",
};

export default async function PrestasiPage() {
  const supabase = await createClient();
  const { data: achievements, error } = await supabase
    .from("achievements")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching achievements:", error);
    return (
      <div className="flex flex-col gap-12 pb-16">
        <section className="bg-primary px-4 py-20 text-center text-primary-foreground">
          <h1 className="mb-4 font-heading text-4xl font-bold">
            Prestasi Sekolah
          </h1>
          <p className="mx-auto max-w-2xl text-lg opacity-90">
            Gagal memuat prestasi. Silakan coba lagi nanti.
          </p>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12 pb-16">
      {/* Header */}
      <section className="bg-primary px-4 py-20 text-center text-primary-foreground">
        <h1 className="mb-4 font-heading text-4xl font-bold">
          Prestasi Sekolah
        </h1>
        <p className="mx-auto max-w-2xl text-lg opacity-90">
          Berbagai pencapaian dan kebanggaan yang telah diraih oleh siswa-siswi
          MIS No. 32/E.3 Ujung Pasir.
        </p>
      </section>

      {/* Achievements Grid */}
      <section className="container mx-auto px-4">
        {achievements.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Belum ada data prestasi.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="overflow-hidden rounded-xl border bg-white shadow-sm"
              >
                {achievement.image_url ? (
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={achievement.image_url}
                      alt={achievement.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : null}
                <div className="p-6">
                  <h3 className="mb-2 font-heading text-xl font-bold text-primary">
                    {achievement.title}
                  </h3>
                  <p className="mb-2 text-lg font-medium text-foreground">
                    {achievement.student_name}
                  </p>
                  <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Award size={16} className="text-primary" />
                      <span>{achievement.level}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CalendarDays size={16} className="text-primary" />
                      <span>{achievement.year}</span>
                    </div>
                  </div>
                  {achievement.description ? (
                    <p className="line-clamp-3 text-sm text-muted-foreground">
                      {achievement.description}
                    </p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}