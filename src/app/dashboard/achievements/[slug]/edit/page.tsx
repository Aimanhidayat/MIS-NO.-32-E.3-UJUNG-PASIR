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
import { updateAchievement } from "../../actions";

export default async function EditAchievementPage({
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

  const { data: achievement, error } = await supabase
    .from("achievements")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (error || !achievement) {
    console.error("Error fetching achievement:", error);
    return redirect("/dashboard/achievements?message=Prestasi tidak ditemukan.");
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Edit Prestasi: {achievement.title}</h1>
        <Link href="/dashboard/achievements">
          <Button variant="outline">Kembali ke Prestasi</Button>
        </Link>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Form Edit Prestasi</CardTitle>
          <CardDescription>Perbarui detail prestasi.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={updateAchievement} className="grid gap-4">
            <input type="hidden" name="id" value={achievement.id} />
            <input type="hidden" name="slug" value={achievement.slug} />
            <input type="hidden" name="existing_image_url" value={achievement.image_url || ""} />

            <div className="grid gap-2">
              <Label htmlFor="title">Judul Prestasi</Label>
              <Input id="title" name="title" required defaultValue={achievement.title} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea id="description" name="description" required rows={5} defaultValue={achievement.description} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="organizer">Penyelenggara</Label>
              <Input id="organizer" name="organizer" required defaultValue={achievement.organizer} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">Tanggal</Label>
              <Input id="date" name="date" type="date" required defaultValue={achievement.date} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Gambar (Opsional)</Label>
              {achievement.image_url && (
                <div className="flex items-center gap-3 mb-2">
                  <Image src={achievement.image_url} alt={achievement.title} width={100} height={100} className="rounded-md object-cover" />
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remove_image" name="remove_image" value="true" />
                    <Label htmlFor="remove_image">Hapus Gambar Saat Ini</Label>
                  </div>
                </div>
              )}
              <Input id="image" name="image" type="file" accept="image/*" />
            </div>
            <Button type="submit" className="w-full">
              Perbarui Prestasi
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