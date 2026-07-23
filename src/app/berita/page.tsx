import Link from "next/link";
import Image from "next/image";
import { CalendarDays, User } from "lucide-react";

export const metadata = {
  title: "Berita | MIS No. 32/E.3 Ujung Pasir",
};

const mockNews = [
  {
    id: "1",
    title: "Kegiatan Bakti Sosial Tahunan MIS Ujung Pasir",
    slug: "kegiatan-bakti-sosial-tahunan-mis-ujung-pasir",
    thumbnail: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop",
    author: "Admin Sekolah",
    date: "2026-07-20",
    excerpt: "MIS No. 32/E.3 Ujung Pasir kembali mengadakan kegiatan bakti sosial tahunan...",
  },
  {
    id: "2",
    title: "Siswa MIS Ujung Pasir Raih Juara 1 Lomba Adzan Tingkat Kabupaten",
    slug: "siswa-mis-ujung-pasir-raih-juara-1-lomba-adzan-tingkat-kabupaten",
    thumbnail: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2070&auto=format&fit=crop",
    author: "Humas Sekolah",
    date: "2026-07-15",
    excerpt: "Prestasi membanggakan kembali ditorehkan oleh siswa kami dalam lomba adzan...",
  },
  {
    id: "3",
    title: "Workshop Peningkatan Kompetensi Guru di Era Digital",
    slug: "workshop-peningkatan-kompetensi-guru-di-era-digital",
    thumbnail: "https://images.unsplash.com/photo-1588072432836-e10892edb93a?q=80&w=2070&auto=format&fit=crop",
    author: "Kepala Sekolah",
    date: "2026-07-10",
    excerpt: "Para guru MIS No. 32/E.3 Ujung Pasir mengikuti workshop untuk meningkatkan...",
  },
  {
    id: "4",
    title: "Perayaan Isra Mi'raj Nabi Muhammad SAW di Sekolah",
    slug: "perayaan-isra-miraj-nabi-muhammad-saw-di-sekolah",
    thumbnail: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2070&auto=format&fit=crop",
    author: "Panitia Acara",
    date: "2026-07-05",
    excerpt: "Seluruh civitas akademika MIS No. 32/E.3 Ujung Pasir merayakan Isra Mi'raj...",
  },
];

export default function BeritaPage() {
  return (
    <div className="flex flex-col gap-12 pb-16">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-20 px-4 text-center">
        <h1 className="font-heading text-4xl font-bold mb-4">Berita Terbaru</h1>
        <p className="text-lg opacity-90 max-w-2xl mx-auto">
          Ikuti perkembangan dan informasi terkini seputar kegiatan di MIS No. 32/E.3 Ujung Pasir.
        </p>
      </section>

      {/* News Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockNews.map((newsItem) => (
            <Link href={`/berita/${newsItem.slug}`} key={newsItem.id} className="block bg-white rounded-xl shadow-sm border overflow-hidden group">
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={newsItem.thumbnail}
                  alt={newsItem.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="font-heading text-xl font-bold mb-3 text-primary group-hover:text-primary/80 transition-colors">
                  {newsItem.title}
                </h3>
                <div className="flex items-center text-sm text-muted-foreground mb-4 gap-4">
                  <div className="flex items-center gap-1">
                    <User size={16} className="text-primary" />
                    <span>{newsItem.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CalendarDays size={16} className="text-primary" />
                    <span>{new Date(newsItem.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm line-clamp-3">
                  {newsItem.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}