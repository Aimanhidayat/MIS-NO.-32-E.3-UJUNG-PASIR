import Link from "next/link";
import Image from "next/image";
import { CalendarDays, User } from "lucide-react";
import { createClient } from "@/utils/supabase/server";

export const metadata = {
  title: "Berita | MIS No. 32/E.3 Ujung Pasir",
};

export default async function BeritaPage() {
  const supabase = await createClient();
  const { data: news, error } = await supabase
    .from("news")
    .select("*")
    .eq("status", "Published")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching news:", error);
    return (
      <div className="flex flex-col gap-12 pb-16">
        <section className="bg-primary text-primary-foreground py-20 px-4 text-center">
          <h1 className="font-heading text-4xl font-bold mb-4">Berita Terbaru</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Gagal memuat berita. Silakan coba lagi nanti.
          </p>
        </section>
      </div>
    );
  }

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
        {news.length === 0 ? (
          <p className="text-center text-muted-foreground">Belum ada berita terbaru.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((newsItem) => (
              <Link href={`/berita/${newsItem.slug}`} key={newsItem.id} className="block bg-white rounded-xl shadow-sm border overflow-hidden group">
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={newsItem.image_url || "/images/placeholder.jpg"}
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
                      <span>{new Date(newsItem.published_at || newsItem.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {newsItem.content.substring(0, 150)}...
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
