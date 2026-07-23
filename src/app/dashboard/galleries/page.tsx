import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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
import { deleteGalleryItem } from "./actions";

export default async function DashboardGalleriesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: galleries, error } = await supabase.from("galleries").select("*").order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching galleries:", error);
    return <p>Error loading galleries.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manajemen Galeri</h1>
        <Link href="/dashboard/galleries/create">
          <Button>
            <PlusCircleIcon className="mr-2 h-4 w-4" /> Tambah Item Galeri Baru
          </Button>
        </Link>
      </div>

      {galleries.length === 0 ? (
        <p className="text-center text-muted-foreground">Belum ada item galeri. Tambahkan item galeri pertama Anda!</p>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Judul</TableHead>
                <TableHead>Gambar</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {galleries.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>
                    {item.image_url && (
                      <Image src={item.image_url} alt={item.title} width={50} height={50} className="rounded-md object-cover" />
                    )}
                  </TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{new Date(item.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/dashboard/galleries/${item.slug}/edit`}>
                        <Button variant="outline" size="icon">
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                      </Link>
                      <form action={deleteGalleryItem}>
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