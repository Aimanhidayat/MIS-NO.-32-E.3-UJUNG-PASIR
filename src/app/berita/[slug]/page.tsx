import { notFound } from "next/navigation";
import Image from "next/image";
import { CalendarDays, User } from "lucide-react";

// Mock data for a single news article
const mockNewsArticles = [
  {
    id: "1",
    title: "Kegiatan Bakti Sosial Tahunan MIS Ujung Pasir",
    slug: "kegiatan-bakti-sosial-tahunan-mis-ujung-pasir",
    thumbnail: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop",
    author: "Admin Sekolah",
    date: "2026-07-20",
    content: `
      <p class="mb-4">
        Assalamu'alaikum Warahmatullahi Wabarakatuh. MIS No. 32/E.3 Ujung Pasir dengan bangga kembali mengadakan kegiatan bakti sosial tahunan yang bertujuan untuk menumbuhkan rasa kepedulian sosial di kalangan siswa dan seluruh civitas akademika. Kegiatan ini dilaksanakan pada hari Sabtu, 20 Juli 2026, bertempat di beberapa desa sekitar Ujung Pasir yang membutuhkan bantuan.
      </p>
      <p class="mb-4">
        Dalam kegiatan ini, siswa-siswi bersama para guru dan staf sekolah bergotong royong menyalurkan bantuan berupa sembako, pakaian layak pakai, serta alat tulis kepada keluarga kurang mampu dan anak yatim. Antusiasme peserta sangat tinggi, terlihat dari semangat mereka dalam mempersiapkan dan mendistribusikan bantuan.
      </p>
      <p class="mb-4">
        Kepala Sekolah, Bapak/Ibu [Nama Kepala Sekolah], menyampaikan bahwa kegiatan ini merupakan agenda rutin sekolah sebagai wujud nyata dari nilai-nilai keagamaan dan kemanusiaan yang diajarkan di madrasah. "Kami berharap, melalui bakti sosial ini, anak-anak dapat belajar tentang pentingnya berbagi dan merasakan kebahagiaan dalam membantu sesama," ujarnya.
      </p>
      <p class="mb-4">
        Selain itu, kegiatan ini juga menjadi sarana untuk mempererat tali silaturahmi antara sekolah dengan masyarakat. Pihak sekolah mengucapkan terima kasih kepada seluruh donatur, orang tua siswa, dan semua pihak yang telah berpartisipasi sehingga kegiatan ini dapat berjalan dengan lancar dan sukses. Semoga kebaikan yang telah diberikan menjadi ladang pahala bagi kita semua. Aamiin.
      </p>
    `,
  },
  {
    id: "2",
    title: "Siswa MIS Ujung Pasir Raih Juara 1 Lomba Adzan Tingkat Kabupaten",
    slug: "siswa-mis-ujung-pasir-raih-juara-1-lomba-adzan-tingkat-kabupaten",
    thumbnail: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2070&auto=format&fit=crop",
    author: "Humas Sekolah",
    date: "2026-07-15",
    content: `
      <p class="mb-4">
        Alhamdulillah, kabar gembira datang dari salah satu siswa terbaik MIS No. 32/E.3 Ujung Pasir, [Nama Siswa], yang berhasil meraih Juara 1 dalam Lomba Adzan Tingkat Kabupaten Kerinci. Lomba yang diselenggarakan pada tanggal 15 Juli 2026 ini diikuti oleh perwakilan dari berbagai sekolah dasar dan madrasah di seluruh kabupaten.
      </p>
      <p class="mb-4">
        [Nama Siswa] menunjukkan penampilan yang memukau dengan suara merdu dan tajwid yang sempurna, berhasil menyisihkan puluhan peserta lainnya. Prestasi ini tidak hanya mengharumkan nama pribadi dan keluarga, tetapi juga membawa kebanggaan bagi seluruh keluarga besar MIS No. 32/E.3 Ujung Pasir.
      </p>
      <p class="mb-4">
        Kepala Sekolah menyampaikan apresiasi setinggi-tingginya kepada [Nama Siswa] atas dedikasi dan kerja kerasnya, serta kepada guru pembimbing yang telah membimbing dengan sabar. "Prestasi ini adalah bukti bahwa dengan usaha dan doa, kita bisa meraih apa yang kita impikan. Semoga ini menjadi motivasi bagi siswa-siswi lain untuk terus berprestasi," kata beliau.
      </p>
      <p class="mb-4">
        Semoga [Nama Siswa] dapat terus mengembangkan bakatnya dan menjadi inspirasi bagi teman-temannya. Selamat dan sukses selalu!
      </p>
    `,
  },
];

interface NewsDetailPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: NewsDetailPageProps) {
  const newsItem = mockNewsArticles.find((item) => item.slug === params.slug);

  if (!newsItem) {
    return {
      title: "Berita Tidak Ditemukan | MIS No. 32/E.3 Ujung Pasir",
    };
  }

  return {
    title: `${newsItem.title} | MIS No. 32/E.3 Ujung Pasir`,
    description: newsItem.content.substring(0, 150) + "...",
  };
}

export default function NewsDetailPage({ params }: NewsDetailPageProps) {
  const newsItem = mockNewsArticles.find((item) => item.slug === params.slug);

  if (!newsItem) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <article className="bg-white rounded-xl shadow-sm border p-6 md:p-8">
        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-6 text-primary">
          {newsItem.title}
        </h1>
        <div className="flex items-center text-sm text-muted-foreground mb-6 gap-4">
          <div className="flex items-center gap-1">
            <User size={16} className="text-primary" />
            <span>{newsItem.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <CalendarDays size={16} className="text-primary" />
            <span>{new Date(newsItem.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>
        <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src={newsItem.thumbnail}
            alt={newsItem.title}
            fill
            className="object-cover"
          />
        </div>
        <div
          className="prose prose-lg max-w-none text-muted-foreground leading-relaxed"
          dangerouslySetInnerHTML={{ __html: newsItem.content }}
        />
      </article>
    </div>
  );
}