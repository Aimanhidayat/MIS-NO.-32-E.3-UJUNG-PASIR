import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createDownload } from "../actions";

export default async function CreateDownloadPage({
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
        <h1 className="text-3xl font-bold">Tambah Dokumen Baru</h1>
        <Link href="/dashboard/downloads">
          <Button variant="outline">Kembali ke Unduhan</Button>
        </Link>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Form Dokumen</CardTitle>
          <CardDescription>Isi detail dokumen baru.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createDownload} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Judul Dokumen</Label>
              <Input id="title" name="title" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Deskripsi (Opsional)</Label>
              <Textarea id="description" name="description" rows={5} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="file">File Dokumen</Label>
              <Input id="file" name="file" type="file" required />
            </div>
            <Button type="submit" className="w-full">
              Buat Dokumen
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