import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRightIcon,
  BarChart3Icon,
  BellIcon,
  DownloadIcon,
  GalleryHorizontalIcon,
  NewspaperIcon,
  ShieldCheckIcon,
  TrophyIcon,
  UsersIcon,
} from "lucide-react";
import { logout } from "../login/actions";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const menus = [
    {
      title: "Berita",
      description: "Tambah, edit, dan hapus berita sekolah.",
      href: "/dashboard/news",
      icon: NewspaperIcon,
      accent: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    },
    {
      title: "Prestasi",
      description: "Kelola dokumentasi prestasi siswa dan sekolah.",
      href: "/dashboard/achievements",
      icon: TrophyIcon,
      accent: "bg-amber-50 text-amber-700 ring-amber-100",
    },
    {
      title: "Galeri",
      description: "Publikasikan foto kegiatan dan dokumentasi sekolah.",
      href: "/dashboard/galleries",
      icon: GalleryHorizontalIcon,
      accent: "bg-sky-50 text-sky-700 ring-sky-100",
    },
    {
      title: "Unduhan",
      description: "Kelola dokumen publik yang dapat diunduh pengunjung.",
      href: "/dashboard/downloads",
      icon: DownloadIcon,
      accent: "bg-violet-50 text-violet-700 ring-violet-100",
    },
  ];

  const quickStats = [
    {
      label: "Konten Publik",
      value: "4 Modul",
      icon: BarChart3Icon,
    },
    {
      label: "Akses Aman",
      value: "Aktif",
      icon: ShieldCheckIcon,
    },
    {
      label: "Pengumuman",
      value: "Realtime",
      icon: BellIcon,
    },
    {
      label: "Admin",
      value: "Terautentikasi",
      icon: UsersIcon,
    },
  ];

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[2rem] bg-primary p-6 text-primary-foreground shadow-2xl shadow-primary/15 sm:p-8">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-sm font-semibold ring-1 ring-white/20">
              <ShieldCheckIcon className="h-4 w-4 text-accent" />
              Panel Admin Website Sekolah
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Dashboard Admin
            </h1>
            <p className="mt-3 text-sm leading-7 text-white/80 sm:text-base">
              Selamat datang, <span className="font-semibold">{user.email}</span>.
              Kelola informasi resmi MIS No. 32/E.3 Ujung Pasir dengan cepat,
              aman, dan terstruktur.
            </p>
          </div>

          <form action={logout}>
            <Button
              type="submit"
              variant="secondary"
              className="rounded-full bg-white px-5 text-primary hover:bg-white/90"
            >
              Logout
            </Button>
          </form>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {quickStats.map((item) => {
          const Icon = item.icon;

          return (
            <Card
              key={item.label}
              className="border-0 bg-white/85 shadow-sm ring-1 ring-slate-200/80"
            >
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="text-lg font-bold text-slate-950">
                    {item.value}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-2xl font-bold">Kelola Konten Website</h2>
          <p className="text-sm text-muted-foreground">
            Pilih modul yang ingin diperbarui untuk menjaga informasi sekolah
            tetap lengkap dan terkini.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {menus.map((menu) => {
            const Icon = menu.icon;

            return (
              <Link key={menu.href} href={menu.href} className="group">
                <Card className="h-full overflow-hidden border-0 bg-white shadow-sm ring-1 ring-slate-200/80 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
                  <CardHeader className="space-y-4">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl ring-1 ${menu.accent}`}
                    >
                      <Icon className="h-7 w-7" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{menu.title}</CardTitle>
                      <p className="mt-2 min-h-12 text-sm leading-6 text-muted-foreground">
                        {menu.description}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      Kelola
                      <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}