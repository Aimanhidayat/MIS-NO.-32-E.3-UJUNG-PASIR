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
import { deleteAchievement } from "./actions";

export default async function DashboardAchievementsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: achievements, error } = await supabase.from("achievements").select("*").order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching achievements:", error);
    return <p>Error loading achievements.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manajemen Prestasi</h1>
        <Link href="/dashboard/achievements/create">
          <Button>
            <PlusCircleIcon className="mr-2 h-4 w-4" /> Tambah Prestasi Baru
          </Button>
        </Link>
      </div>

      {achievements.length === 0 ? (
        <p className="text-center text-muted-foreground">Belum ada prestasi. Tambahkan prestasi pertama Anda!</p>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Judul</TableHead>
                <TableHead>Nama Siswa</TableHead>
                <TableHead>Tingkat</TableHead>
                <TableHead>Tahun</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {achievements.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>{item.student_name}</TableCell>
                  <TableCell>{item.level}</TableCell>
                  <TableCell>{item.year}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/dashboard/achievements/${item.id}/edit`}>
                        <Button variant="outline" size="icon">
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                      </Link>
                      <form action={deleteAchievement}>
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