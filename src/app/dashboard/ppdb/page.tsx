import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export const metadata = {
  title: "Data PPDB | Dashboard Admin",
};

function getStatusClassName(status: string) {
  if (status === "Approved") {
    return "bg-green-100 text-green-700";
  }

  if (status === "Rejected") {
    return "bg-red-100 text-red-700";
  }

  return "bg-yellow-100 text-yellow-700";
}

export default async function DashboardPpdbPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: ppdbRegistrations, error } = await supabase
    .from("ppdb")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching PPDB registrations:", error);
    return (
      <div className="rounded-lg border bg-white p-6">
        <h1 className="mb-2 text-3xl font-bold">Data Pendaftar PPDB</h1>
        <p className="text-red-600">
          Gagal memuat data PPDB: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Data Pendaftar PPDB</h1>
        <p className="mt-2 text-muted-foreground">
          Daftar calon peserta didik yang mengisi formulir PPDB online.
        </p>
      </div>

      {!ppdbRegistrations || ppdbRegistrations.length === 0 ? (
        <div className="rounded-lg border bg-white p-8 text-center text-muted-foreground">
          Belum ada data pendaftaran PPDB.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-md border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No. Pendaftaran</TableHead>
                <TableHead>Nama Siswa</TableHead>
                <TableHead>NISN</TableHead>
                <TableHead>NIK</TableHead>
                <TableHead>TTL</TableHead>
                <TableHead>Jenis Kelamin</TableHead>
                <TableHead>Orang Tua/Wali</TableHead>
                <TableHead>No. HP</TableHead>
                <TableHead>Sekolah Asal</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tanggal Daftar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ppdbRegistrations.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    {item.registration_number}
                  </TableCell>
                  <TableCell>{item.full_name}</TableCell>
                  <TableCell>{item.nisn || "-"}</TableCell>
                  <TableCell>{item.nik}</TableCell>
                  <TableCell>
                    {item.birth_place},{" "}
                    {new Date(item.birth_date).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell>{item.gender || "-"}</TableCell>
                  <TableCell>{item.parent_name}</TableCell>
                  <TableCell>{item.parent_phone}</TableCell>
                  <TableCell>{item.previous_school || "-"}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusClassName(
                        item.status,
                      )}`}
                    >
                      {item.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {new Date(item.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
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