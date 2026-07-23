import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowLeftIcon,
  CheckCircle2Icon,
  GraduationCapIcon,
  LockKeyholeIcon,
  MapPinIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "lucide-react";
import { login } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const params = await searchParams;
  const message = params.message ? decodeURIComponent(params.message) : "";
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/dashboard");
  }

  const highlights = [
    "Kelola berita, pengumuman, galeri, prestasi, dan dokumen sekolah.",
    "Akses dashboard dilindungi autentikasi Supabase.",
    "Panel admin responsif untuk operator dan pengelola sekolah.",
  ];

  return (
    <section className="relative isolate min-h-[calc(100vh-8rem)] overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(11,110,79,0.16),transparent_34%),linear-gradient(135deg,#f8fafc_0%,#ecfdf5_45%,#f8fafc_100%)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -right-28 bottom-10 h-80 w-80 rounded-full bg-accent/25 blur-3xl" />

      <div className="relative mx-auto grid min-h-[calc(100vh-13rem)] w-full max-w-6xl items-center gap-8 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="space-y-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/75 px-4 py-2 text-sm font-medium text-primary shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Kembali ke Beranda
          </Link>

          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary ring-1 ring-primary/15">
              <SparklesIcon className="h-4 w-4" />
              Portal Administrasi Sekolah
            </div>

            <div className="space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-primary text-primary-foreground shadow-xl shadow-primary/20">
                <GraduationCapIcon className="h-9 w-9" />
              </div>
              <div>
                <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                  Dashboard Resmi MIS No. 32/E.3 Ujung Pasir
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                  Masuk untuk mengelola konten website sekolah secara aman,
                  rapi, dan terpusat dalam satu dashboard.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-3">
            {highlights.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-white/70 bg-white/70 p-4 shadow-sm backdrop-blur"
              >
                <CheckCircle2Icon className="mt-0.5 h-5 w-5 flex-none text-secondary" />
                <p className="text-sm leading-6 text-slate-700">{item}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-primary/10 bg-primary p-5 text-primary-foreground shadow-xl shadow-primary/15">
              <ShieldCheckIcon className="mb-4 h-7 w-7 text-accent" />
              <p className="text-sm font-medium text-white/75">
                Keamanan Login
              </p>
              <p className="mt-1 text-2xl font-bold">Supabase Auth</p>
            </div>
            <div className="rounded-3xl border border-white/70 bg-white/75 p-5 shadow-sm backdrop-blur">
              <MapPinIcon className="mb-4 h-7 w-7 text-primary" />
              <p className="text-sm font-medium text-muted-foreground">
                Lokasi Sekolah
              </p>
              <p className="mt-1 font-semibold text-slate-900">
                Ujung Pasir, Tanah Cogok, Kerinci
              </p>
            </div>
          </div>
        </div>

        <Card className="relative overflow-hidden border-0 bg-white/90 shadow-2xl shadow-slate-900/10 backdrop-blur-xl">
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary via-secondary to-accent" />
          <CardHeader className="space-y-3 px-6 pt-8 sm:px-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15">
              <LockKeyholeIcon className="h-7 w-7" />
            </div>
            <div>
              <CardTitle className="text-3xl">Login Admin</CardTitle>
              <CardDescription className="mt-2 text-base leading-7">
                Gunakan akun yang sudah terdaftar untuk mengakses panel
                pengelolaan website sekolah.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="px-6 pb-8 sm:px-8">
            <form action={login} className="space-y-5">
              <div className="grid gap-2">
                <Label htmlFor="email">Email Admin</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@sekolah.sch.id"
                  autoComplete="email"
                  className="h-12 rounded-xl bg-white"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Masukkan password"
                  autoComplete="current-password"
                  className="h-12 rounded-xl bg-white"
                  required
                />
              </div>

              {message && (
                <div className="rounded-2xl border border-destructive/25 bg-destructive/10 p-4 text-sm leading-6 text-destructive">
                  {message}
                </div>
              )}

              <Button
                type="submit"
                className="h-12 w-full rounded-xl bg-primary text-base font-semibold shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:bg-primary/90"
              >
                Masuk ke Dashboard
              </Button>

              <p className="text-center text-xs leading-6 text-muted-foreground">
                Akses dashboard hanya untuk kepala sekolah, operator, guru, dan
                staf yang berwenang.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}