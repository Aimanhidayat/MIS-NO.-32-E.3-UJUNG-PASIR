import Image from "next/image";
import { createClient } from "@/utils/supabase/server";

export const metadata = {
  title: "Galeri | MIS No. 32/E.3 Ujung Pasir",
};

export default async function GaleriPage() {
  const supabase = await createClient();
  const { data: gallery, error } = await supabase
    .from("galleries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching gallery:", error);
    return (
      <div className="flex flex-col gap-12 pb-16">
        <section className="bg-primary text-primary-foreground py-20 px-4 text-center">
          <h1 className="font-heading text-4xl font-bold mb-4">Galeri Kegiatan</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Gagal memuat galeri. Silakan coba lagi nanti.
          </p>
        </section>
      </div>
    );
  }

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
        {gallery.length === 0 ? (
          <p className="text-center text-muted-foreground">Belum ada dokumentasi galeri.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {gallery.map((item) => (
              <div key={item.id} className="group relative rounded-xl overflow-hidden cursor-pointer shadow-sm">
                <div className="relative w-full aspect-square">
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  {item.category && (
                    <span className="text-accent text-xs font-bold uppercase tracking-wider mb-1">
                      {item.category}
                    </span>
                  )}
                  <h3 className="text-white font-heading font-bold text-lg leading-tight">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
