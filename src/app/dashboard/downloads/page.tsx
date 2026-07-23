import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircleIcon, PencilIcon, Trash2Icon, DownloadIcon } from "lucide-react";
import { deleteDownload } from "./actions";

export default async function DashboardDownloadsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: downloads, error } = await supabase.from("downloads").select("*").order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching downloads:", error);
    return <p>Error loading downloads.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manajemen Unduhan</h1>
        <Link href="/dashboard/downloads/create">
          <Button>
            <PlusCircleIcon className="mr-2 h-4 w-4" /> Tambah Dokumen Baru
          </Button>
        </Link>
      </div>

      {downloads.length === 0 ? (
        <p className="text-center text-muted-foreground">Belum ada dokumen. Tambahkan dokumen pertama Anda!</p>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Judul</TableHead>
                <TableHead>File</TableHead>
                <TableHead>Ukuran</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {downloads.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>
                    {item.file_url && (
                      <Link href={item.file_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:underline">
                        <DownloadIcon className="h-4 w-4" /> {item.file_name}
                      </Link>
                    )}
                  </TableCell>
                  <TableCell>{(item.file_size / 1024).toFixed(2)} KB</TableCell>
                  <TableCell>{new Date(item.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/dashboard/downloads/${item.slug}/edit`}>
                        <Button variant="outline" size="icon">
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                      </Link>
                      <form action={deleteDownload}>
                        <input type="hidden" name="id" value={item.id} />
                        <Button variant="destructive" size="icon" type="submit">
                          <Trash2Icon className="h-4 w-4" />
                        </Button>
                      </form>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}