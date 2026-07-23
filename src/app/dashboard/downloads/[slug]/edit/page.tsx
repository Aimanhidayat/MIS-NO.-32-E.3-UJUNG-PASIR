import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { updateDownload } from "../../actions";

export default async function EditDownloadPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { message: string };
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: download, error } = await supabase
    .from("downloads")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (error || !download) {
    console.error("Error fetching download:", error);
    return redirect("/dashboard/downloads?message=Dokumen tidak ditemukan.");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Edit Dokumen: {download.title}</h1>
        <Link href="/dashboard/downloads">
          <Button variant="outline">Kembali ke Unduhan</Button>
        </Link>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Form Edit Dokumen</CardTitle>
          <CardDescription>Perbarui detail dokumen.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={updateDownload} className="grid gap-4">
            <input type="hidden" name="id" value={download.id} />
            <input type="hidden" name="slug" value={download.slug} />
            <input type="hidden" name="existing_file_url" value={download.file_url || ""} />
            <input type="hidden" name="existing_file_name" value={download.file_name || ""} />
            <input type="hidden" name="existing_file_size" value={download.file_size || 0} />

            <div className="grid gap-2">
              <Label htmlFor="title">Judul Dokumen</Label>
              <Input id="title" name="title" required defaultValue={download.title} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Deskripsi (Opsional)</Label>
              <Textarea id="description" name="description" rows={5} defaultValue={download.description || ""} />
            </div>
            <div className="grid gap-2">
              <Label>File Saat Ini</Label>
              {download.file_url ? (
                <Link href={download.file_url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                  {download.file_name} ({(download.file_size / 1024).toFixed(2)} KB)
                </Link>
              ) : (
                <p className="text-sm text-muted-foreground">Tidak ada file.</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="file">Ganti File (Opsional)</Label>
              <Input id="file" name="file" type="file" />
            </div>
            <Button type="submit" className="w-full">
              Perbarui Dokumen
            </Button>
            {searchParams?.message && (
              <p className="mt-4 bg-foreground/10 p-4 text-center text-foreground">
                {searchParams.message}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}