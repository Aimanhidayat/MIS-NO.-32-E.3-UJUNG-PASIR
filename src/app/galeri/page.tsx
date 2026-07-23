import Image from "next/image";

export const metadata = {
  title: "Galeri | MIS No. 32/E.3 Ujung Pasir",
};

const mockGallery = [
  {
    id: "1",
    title: "Kegiatan Belajar Mengajar",
    category: "Akademik",
    imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Pramuka Siaga",
    category: "Ekstrakurikuler",
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Lomba Peringatan 17 Agustus",
    category: "Kegiatan",
    imageUrl: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Praktik Sholat Berjamaah",
    category: "Keagamaan",
    imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "5",
    title: "Gotong Royong Kebersihan Sekolah",
    category: "Sosial",
    imageUrl: "https://images.unsplash.com/photo-1588072432836-e10892edb93a?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "6",
    title: "Peringatan Hari Guru",
    category: "Kegiatan",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2070&auto=format&fit=crop",
  },
];

export default function GaleriPage() {
  return (
    <div className="flex flex-col gap-12 pb-16">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-20 px-4 text-center">
        <h1 className="font-heading text-4xl font-bold mb-4">Galeri Kegiatan</h1>
        <p className="text-lg opacity-90 max-w-2xl mx-auto">
          Dokumentasi berbagai momen penting dan aktivitas siswa-siswi MIS No. 32/E.3 Ujung Pasir.
        </p>
      </section>

      {/* Gallery Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {mockGallery.map((item) => (
            <div key={item.id} className="group relative rounded-xl overflow-hidden cursor-pointer shadow-sm">
              <div className="relative w-full aspect-square">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-accent text-xs font-bold uppercase tracking-wider mb-1">
                  {item.category}
                </span>
                <h3 className="text-white font-heading font-bold text-lg leading-tight">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}