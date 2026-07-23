import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { updateNews } from "../../actions";

export default async function EditNewsPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { message: string };
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: newsItem, error } = await supabase
    .from("news")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (error || !newsItem) {
    console.error("Error fetching news item:", error);
    return redirect("/dashboard/news?message=Berita tidak ditemukan.");
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Edit Berita: {newsItem.title}</h1>
        <Link href="/dashboard/news">
          <Button variant="outline">Kembali ke Berita</Button>
        </Link>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Form Edit Berita</CardTitle>
          <CardDescription>Perbarui detail berita.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={updateNews} className="grid gap-4">
            <input type="hidden" name="id" value={newsItem.id} />
            <input type="hidden" name="slug" value={newsItem.slug} />
            <input type="hidden" name="existing_image_url" value={newsItem.image_url || ""} />

            <div className="grid gap-2">
              <Label htmlFor="title">Judul Berita</Label>
              <Input id="title" name="title" required defaultValue={newsItem.title} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content">Konten Berita</Label>
              <Textarea id="content" name="content" required rows={10} defaultValue={newsItem.content} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="author">Penulis</Label>
              <Input id="author" name="author" required defaultValue={newsItem.author} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Gambar (Opsional)</Label>
              {newsItem.image_url && (
                <div className="flex items-center gap-2 mb-2">
                  <Image src={newsItem.image_url} alt="Current Image" width={100} height={100} className="rounded-md object-cover" />
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remove_image" name="remove_image" value="true" />
                    <Label htmlFor="remove_image">Hapus Gambar Saat Ini</Label>
                  </div>
                </div>
              )}
              <Input id="image" name="image" type="file" accept="image/*" />
            </div>
            <Button type="submit" className="w-full">
              Perbarui Berita
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