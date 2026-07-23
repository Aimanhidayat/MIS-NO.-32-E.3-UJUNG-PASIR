import { Users } from "lucide-react";

export const metadata = {
  title: "Profil | MIS No. 32/E.3 Ujung Pasir",
};

export default function ProfilPage() {
  return (
    <div className="flex flex-col gap-12 pb-16">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-20 px-4 text-center">
          <h1 className="font-heading text-4xl font-bold mb-4">Profil Sekolah</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Mengenal lebih dekat tentang MIS No. 32/E.3 Ujung Pasir, visi misi, serta tenaga pendidik yang berdedikasi.
          </p>
          <p className="text-lg text-gray-700">
            MIS No. 32/E.3 Ujung Pasir adalah lembaga pendidikan dasar yang
            berkomitmen untuk mencetak generasi unggul dengan landasan agama
            yang kuat.
          </p>
          <p className="text-lg text-gray-700">
            Kami percaya bahwa pendidikan adalah kunci untuk masa depan yang
            lebih baik, dan kami berupaya keras untuk menyediakan lingkungan
            belajar yang kondusif dan inovatif.
          </p>
      </section>

      {/* Sejarah */}
      <section className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white p-8 rounded-2xl shadow-sm border">
          <h2 className="font-heading text-2xl font-bold mb-6 text-primary border-b pb-4">Sejarah Singkat</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              MIS No. 32/E.3 Ujung Pasir didirikan dengan semangat untuk menyediakan pendidikan dasar berbasis nilai-nilai Islam bagi masyarakat Desa Ujung Pasir dan sekitarnya. Sejak awal berdirinya, madrasah ini terus berkembang dan beradaptasi dengan kemajuan zaman tanpa meninggalkan akar tradisi keagamaan.
            </p>
            <p>
              Perjalanan panjang sekolah ini dipenuhi dengan berbagai prestasi yang membanggakan, baik di bidang akademik maupun non-akademik, menjadikannya salah satu institusi pendidikan dasar pilihan di Kabupaten Kerinci.
            </p>
          </div>
        </div>
      </section>

      {/* Visi Misi */}
      <section className="container mx-auto px-4 max-w-4xl">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-50 p-8 rounded-2xl border">
            <h2 className="font-heading text-2xl font-bold mb-6 text-primary">Visi</h2>
            <p className="text-lg font-medium text-foreground italic">
              &ldquo;Terwujudnya generasi islami yang cerdas, berakhlak mulia, berprestasi, dan berwawasan lingkungan.&rdquo;
            </p>
          </div>
          <div className="bg-slate-50 p-8 rounded-2xl border">
            <h2 className="font-heading text-2xl font-bold mb-6 text-primary">Misi</h2>
            <ul className="list-disc list-outside ml-5 space-y-3 text-muted-foreground">
              <li>Menyelenggarakan pendidikan yang memadukan ilmu umum dan agama.</li>
              <li>Membina peserta didik agar memiliki akhlakul karimah.</li>
              <li>Meningkatkan prestasi akademik dan non-akademik.</li>
              <li>Menciptakan lingkungan sekolah yang bersih, sehat, dan asri.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Struktur Organisasi & Guru */}
      <section className="container mx-auto px-4 text-center">
        <h2 className="font-heading text-3xl font-bold mb-12 text-primary">Tenaga Pendidik & Kependidikan</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Mockup Data Guru */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-white p-6 rounded-xl border shadow-sm flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-slate-200 rounded-full mb-4 flex items-center justify-center text-slate-400">
                <Users size={32} />
              </div>
              <h3 className="font-bold text-lg mb-1">Nama Guru {i}</h3>
              <p className="text-sm text-primary font-medium mb-2">Guru Kelas</p>
              <p className="text-xs text-muted-foreground">NIP. 19800101200501100{i}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}