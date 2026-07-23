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
import { PlusCircleIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { deleteNews } from "./actions";

export default async function DashboardNewsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: news, error } = await supabase.from("news").select("*").order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching news:", error);
    return <p>Error loading news.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manajemen Berita</h1>
        <Link href="/dashboard/news/create">
          <Button>
            <PlusCircleIcon className="mr-2 h-4 w-4" /> Tambah Berita Baru
          </Button>
        </Link>
      </div>

      {news.length === 0 ? (
        <p className="text-center text-muted-foreground">Belum ada berita. Tambahkan berita pertama Anda!</p>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Judul</TableHead>
                <TableHead>Penulis</TableHead>
                <TableHead>Tanggal Publikasi</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {news.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>{item.author}</TableCell>
                  <TableCell>{new Date(item.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/dashboard/news/${item.slug}/edit`}>
                        <Button variant="outline" size="icon">
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                      </Link>
                      <form action={deleteNews}>
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