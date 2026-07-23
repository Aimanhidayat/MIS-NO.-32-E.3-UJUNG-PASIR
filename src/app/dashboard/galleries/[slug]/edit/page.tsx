import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateGalleryItem } from "../../actions";

export default async function EditGalleryPage({
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

  const { data: gallery, error } = await supabase
    .from("galleries")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (error || !gallery) {
    console.error("Error fetching gallery item:", error);
    return redirect("/dashboard/galleries?message=Item galeri tidak ditemukan.");
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Edit Galeri: {gallery.title}</h1>
        <Link href="/dashboard/galleries">
          <Button variant="outline">Kembali ke Galeri</Button>
        </Link>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Form Edit Galeri</CardTitle>
          <CardDescription>Perbarui detail item galeri.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={updateGalleryItem} className="grid gap-4">
            <input type="hidden" name="id" value={gallery.id} />
            <input type="hidden" name="slug" value={gallery.slug} />
            <input type="hidden" name="existing_image_url" value={gallery.image_url || ""} />

            <div className="grid gap-2">
              <Label htmlFor="title">Judul</Label>
              <Input id="title" name="title" required defaultValue={gallery.title} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Deskripsi (Opsional)</Label>
              <Textarea id="description" name="description" rows={5} defaultValue={gallery.description || ""} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Tipe</Label>
              <Select name="type" required defaultValue={gallery.type}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Tipe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="foto">Foto</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Gambar</Label>
              {gallery.image_url && (
                <Image src={gallery.image_url} alt={gallery.title} width={120} height={120} className="rounded-md object-cover" />
              )}
              <Input id="image" name="image" type="file" accept="image/*" />
            </div>
            <Button type="submit" className="w-full">
              Perbarui Item Galeri
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