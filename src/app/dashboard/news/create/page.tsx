import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createNews } from "../actions";

export default async function CreateNewsPage({
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
        <h1 className="text-3xl font-bold">Tambah Berita Baru</h1>
        <Link href="/dashboard/news">
          <Button variant="outline">Kembali ke Berita</Button>
        </Link>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Form Berita</CardTitle>
          <CardDescription>Isi detail berita baru.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createNews} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Judul Berita</Label>
              <Input id="title" name="title" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content">Konten Berita</Label>
              <Textarea id="content" name="content" required rows={10} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="author">Penulis</Label>
              <Input id="author" name="author" required defaultValue={user.email || ""} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Gambar (Opsional)</Label>
              <Input id="image" name="image" type="file" accept="image/*" />
            </div>
            <Button type="submit" className="w-full">
              Buat Berita
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