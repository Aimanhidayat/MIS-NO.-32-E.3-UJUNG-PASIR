import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const metadata = {
  title: "Manajemen Pengguna | Dashboard Admin",
};

export default async function UsersManagementPage() {
  const supabase = await createClient();

  // Dapatkan semua data profil dari Supabase
  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error loading profiles:", error);
  }

  // Server Action untuk mengupdate role user
  async function updateRole(formData: FormData) {
    "use server";
    const userId = formData.get("userId") as string;
    const newRole = formData.get("role") as string;

    if (!userId || !newRole) return;

    const supabase = await createClient();
    const { error } = await supabase
      .from("profiles")
      .update({ role: newRole })
      .eq("id", userId);

    if (error) {
      console.error("Failed to update user role:", error);
    } else {
      revalidatePath("/dashboard/users");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl font-bold text-gray-800">
          Manajemen Pengguna
        </h1>
        <p className="text-sm text-gray-500">
          Kelola hak akses dan peran (role) pengguna platform.
        </p>
      </div>

      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b bg-gray-50 text-gray-500 text-sm font-semibold uppercase">
                <th className="p-4">Nama Lengkap</th>
                <th className="p-4">ID Pengguna</th>
                <th className="p-4">Role / Peran</th>
                <th className="p-4 text-center">Ubah Peran</th>
                <th className="p-4">Tanggal Bergabung</th>
              </tr>
            </thead>
            <tbody className="divide-y text-gray-700 text-sm">
              {profiles && profiles.length > 0 ? (
                profiles.map((profile) => (
                  <tr key={profile.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-medium text-gray-900 flex items-center gap-3">
                      {profile.avatar_url ? (
                        <img
                          src={profile.avatar_url}
                          alt={profile.full_name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                          {profile.full_name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      {profile.full_name}
                    </td>
                    <td className="p-4 font-mono text-xs text-gray-500">
                      {profile.id}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          profile.role === "Super Admin"
                            ? "bg-red-100 text-red-800"
                            : profile.role === "Kepala Sekolah"
                            ? "bg-purple-100 text-purple-800"
                            : profile.role === "Operator"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {profile.role}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <form action={updateRole} className="inline-flex items-center gap-2">
                        <input type="hidden" name="userId" value={profile.id} />
                        <select
                          name="role"
                          defaultValue={profile.role}
                          className="rounded border border-gray-350 px-2 py-1 text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                        >
                          <option value="Operator">Operator</option>
                          <option value="Super Admin">Super Admin</option>
                          <option value="Kepala Sekolah">Kepala Sekolah</option>
                          <option value="Guru">Guru</option>
                        </select>
                        <button
                          type="submit"
                          className="bg-primary text-white text-xs px-2.5 py-1 rounded hover:bg-primary-dark transition font-medium"
                        >
                          Simpan
                        </button>
                      </form>
                    </td>
                    <td className="p-4 text-gray-500">
                      {new Date(profile.created_at).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    Tidak ada data pengguna ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}