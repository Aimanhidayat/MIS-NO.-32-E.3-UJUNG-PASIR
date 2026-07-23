import Link from "next/link";
import { ArrowRight, BookOpen, Trophy, Users, Image as ImageIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] flex items-center justify-center bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        {/* Placeholder for hero background image */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
        
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6">
            Selamat Datang di MIS No. 32/E.3 Ujung Pasir
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Membentuk generasi islami yang cerdas, berakhlak mulia, dan berprestasi untuk masa depan yang lebih baik.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/ppdb" className={buttonVariants({ variant: "default", size: "lg", className: "bg-accent text-accent-foreground hover:bg-accent/90" })}>
              Daftar PPDB Sekarang
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link href="/profil" className={buttonVariants({ variant: "outline", size: "lg", className: "bg-transparent text-white border-white hover:bg-white/10 hover:text-white" })}>
              Pelajari Lebih Lanjut
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links / Features */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-24 relative z-30">
          {[
            { title: "Profil Sekolah", icon: BookOpen, href: "/profil", desc: "Kenali lebih dekat visi, misi, dan sejarah sekolah kami." },
            { title: "Berita & Pengumuman", icon: Users, href: "/berita", desc: "Informasi terbaru seputar kegiatan akademik dan non-akademik." },
            { title: "Prestasi Siswa", icon: Trophy, href: "/prestasi", desc: "Daftar pencapaian membanggakan dari siswa-siswi kami." },
            { title: "Galeri Kegiatan", icon: ImageIcon, href: "/galeri", desc: "Dokumentasi berbagai aktivitas seru di lingkungan sekolah." },
          ].map((item, index) => (
            <Link key={index} href={item.href} className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center transition-transform hover:-translate-y-2 border border-slate-100">
              <div className="w-14 h-14 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                <item.icon size={28} />
              </div>
              <h3 className="font-heading font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Sambutan Kepala Sekolah */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-slate-50 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-12">
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shrink-0 bg-slate-200 border-4 border-white shadow-xl">
            {/* Placeholder untuk foto kepala sekolah */}
            <div className="w-full h-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              Foto Kepsek
            </div>
          </div>
          <div>
            <h2 className="font-heading text-3xl font-bold mb-4 text-primary">Sambutan Kepala Sekolah</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              &ldquo;Assalamu’alaikum Warahmatullahi Wabarakatuh. Selamat datang di website resmi MIS No. 32/E.3 Ujung Pasir. 
              Website ini hadir sebagai media informasi dan komunikasi antara sekolah dengan orang tua siswa, masyarakat, 
              serta instansi terkait. Kami berkomitmen untuk terus meningkatkan kualitas pendidikan dan memberikan layanan terbaik.&rdquo;
            </p>
            <div>
              <p className="font-bold text-lg">Nama Kepala Sekolah, S.Pd.I</p>
              <p className="text-sm text-muted-foreground">Kepala MIS No. 32/E.3 Ujung Pasir</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}