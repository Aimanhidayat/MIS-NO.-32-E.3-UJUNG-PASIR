import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createAchievement } from "../actions";

export default async function CreateAchievementPage({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Tambah Prestasi Baru</h1>
        <Link href="/dashboard/achievements">
          <Button variant="outline">Kembali ke Prestasi</Button>
        </Link>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Form Prestasi</CardTitle>
          <CardDescription>Isi detail prestasi baru.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createAchievement} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Judul Prestasi</Label>
              <Input id="title" name="title" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea id="description" name="description" required rows={5} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="organizer">Penyelenggara</Label>
              <Input id="organizer" name="organizer" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">Tanggal</Label>
              <Input id="date" name="date" type="date" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Gambar (Opsional)</Label>
              <Input id="image" name="image" type="file" accept="image/*" />
            </div>
            <Button type="submit" className="w-full">
              Buat Prestasi
            </Button>
            {searchParams?.message && (
              <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                {searchParams.message}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}