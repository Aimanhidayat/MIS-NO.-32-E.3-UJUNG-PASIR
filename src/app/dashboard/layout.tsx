import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { logout } from "../login/actions";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex-grow">
          <ul>
            <li className="mb-2">
              <Link href="/dashboard" className="block hover:bg-gray-700 p-2 rounded">
                Dashboard Utama
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/dashboard/news" className="block hover:bg-gray-700 p-2 rounded">
                Berita
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/dashboard/achievements" className="block hover:bg-gray-700 p-2 rounded">
                Prestasi
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/dashboard/galleries" className="block hover:bg-gray-700 p-2 rounded">
                Galeri
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/dashboard/announcements" className="block hover:bg-gray-700 p-2 rounded">
                Pengumuman
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/dashboard/downloads" className="block hover:bg-gray-700 p-2 rounded">
                Unduhan
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/dashboard/ppdb" className="block hover:bg-gray-700 p-2 rounded">
                PPDB
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/dashboard/users" className="block hover:bg-gray-700 p-2 rounded">
                Manajemen Pengguna
              </Link>
            </li>
          </ul>
        </nav>
        <form action={logout} className="mt-auto">
          <Button type="submit" variant="destructive" className="w-full">
            Logout
          </Button>
        </form>
      </aside>
      <main className="flex-1 p-8 bg-gray-50">
        {children}
      </main>
    </div>
  );
}