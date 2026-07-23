import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DownloadIcon,
  GalleryHorizontalIcon,
  NewspaperIcon,
  TrophyIcon,
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Admin</h1>
          <p className="text-muted-foreground">
            Selamat datang, {user.email}. Pilih menu di bawah untuk mengelola
            konten website sekolah.
          </p>
        </div>
        <form action={logout}>
          <Button type="submit" variant="destructive">
            Logout
          </Button>
        </form>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Link href="/dashboard/news">
          <Card className="transition-shadow hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Berita</CardTitle>
              <NewspaperIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Kelola Berita</div>
              <p className="text-xs text-muted-foreground">
                Tambah, edit, dan hapus berita sekolah.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/achievements">
          <Card className="transition-shadow hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Prestasi</CardTitle>
              <TrophyIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Kelola Prestasi</div>
              <p className="text-xs text-muted-foreground">
                Tambah, edit, dan hapus data prestasi.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/galleries">
          <Card className="transition-shadow hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Galeri</CardTitle>
              <GalleryHorizontalIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Kelola Galeri</div>
              <p className="text-xs text-muted-foreground">
                Tambah, edit, dan hapus dokumentasi kegiatan.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/downloads">
          <Card className="transition-shadow hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unduhan</CardTitle>
              <DownloadIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Kelola Unduhan</div>
              <p className="text-xs text-muted-foreground">
                Tambah, edit, dan hapus dokumen publik.
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}