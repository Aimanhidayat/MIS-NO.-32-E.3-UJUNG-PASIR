import Image from "next/image";
import { Award, CalendarDays } from "lucide-react";

export const metadata = {
  title: "Prestasi | MIS No. 32/E.3 Ujung Pasir",
};

const mockAchievements = [
  {
    id: "1",
    title: "Juara 1 Lomba Adzan Tingkat Kabupaten",
    studentName: "Muhammad Fatih",
    level: "Kabupaten",
    year: 2026,
    imageUrl: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2070&auto=format&fit=crop",
    description: "Muhammad Fatih berhasil meraih juara pertama dalam lomba adzan yang diselenggarakan oleh Kemenag Kabupaten Kerinci.",
  },
  {
    id: "2",
    title: "Juara 3 Lomba Tahfidz Qur'an Tingkat Provinsi",
    studentName: "Aisyah Nuraini",
    level: "Provinsi",
    year: 2025,
    imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2070&auto=format&fit=crop",
    description: "Aisyah Nuraini menunjukkan kemampuannya dalam menghafal Al-Qur'an dan meraih juara ketiga di tingkat provinsi.",
  },
  {
    id: "3",
    title: "Juara Harapan 1 Lomba Kaligrafi Islami",
    studentName: "Fauzan Akbar",
    level: "Kabupaten",
    year: 2026,
    imageUrl: "https://images.unsplash.com/photo-1588072432836-e10892edb93a?q=80&w=2070&auto=format&fit=crop",
    description: "Fauzan Akbar meraih juara harapan pertama dalam lomba kaligrafi dengan karya yang indah dan penuh makna.",
  },
  {
    id: "4",
    title: "Peserta Terbaik Olimpiade Sains Madrasah (OSM)",
    studentName: "Siti Aminah",
    level: "Sekolah",
    year: 2026,
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop",
    description: "Siti Aminah menjadi peserta terbaik dalam Olimpiade Sains Madrasah tingkat sekolah.",
  },
];

export default function PrestasiPage() {
  return (
    <div className="flex flex-col gap-12 pb-16">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-20 px-4 text-center">
        <h1 className="font-heading text-4xl font-bold mb-4">Prestasi Sekolah</h1>
        <p className="text-lg opacity-90 max-w-2xl mx-auto">
          Berbagai pencapaian dan kebanggaan yang telah diraih oleh siswa-siswi MIS No. 32/E.3 Ujung Pasir.
        </p>
      </section>

      {/* Achievements Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockAchievements.map((achievement) => (
            <div key={achievement.id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={achievement.imageUrl}
                  alt={achievement.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-heading text-xl font-bold mb-2 text-primary">
                  {achievement.title}
                </h3>
                <p className="text-lg font-medium text-foreground mb-2">
                  {achievement.studentName}
                </p>
                <div className="flex items-center text-sm text-muted-foreground mb-4 gap-4">
                  <div className="flex items-center gap-1">
                    <Award size={16} className="text-primary" />
                    <span>{achievement.level}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CalendarDays size={16} className="text-primary" />
                    <span>{achievement.year}</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm line-clamp-3">
                  {achievement.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}