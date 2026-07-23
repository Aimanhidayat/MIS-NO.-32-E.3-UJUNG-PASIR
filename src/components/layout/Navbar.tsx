import Link from "next/link";
import { GraduationCapIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { logout } from "@/app/login/actions";
import MobileNav from "./MobileNav";

const navLinks = [
  { name: "Beranda", href: "/" },
  { name: "Profil", href: "/profil" },
  { name: "Berita", href: "/berita" },
  { name: "Pengumuman", href: "/pengumuman" },
  { name: "Prestasi", href: "/prestasi" },
  { name: "Galeri", href: "/galeri" },
  { name: "PPDB", href: "/ppdb" },
  { name: "Download", href: "/download" },
];

export default async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background/90 shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-background/75">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
            <GraduationCapIcon className="h-6 w-6" />
          </div>
          <div className="leading-tight">
            <p className="font-heading text-base font-bold text-primary sm:text-lg">
              MIS Ujung Pasir
            </p>
            <p className="hidden text-xs text-muted-foreground sm:block">
              No. 32/E.3 Kerinci
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-5 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="rounded-full px-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.name}
            </Link>
          ))}
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="rounded-full px-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Dashboard
              </Link>
              <form action={logout}>
                <button
                  type="submit"
                  className={buttonVariants({ variant: "ghost", size: "sm" })}
                >
                  Logout
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/login"
              className={buttonVariants({
                variant: "default",
                className:
                  "rounded-full bg-primary px-5 shadow-sm shadow-primary/20 hover:bg-primary/90",
              })}
            >
              Login Admin
            </Link>
          )}
        </div>

        {/* Mobile Nav */}
        <MobileNav navLinks={navLinks} user={user} />
      </div>
    </nav>
  );
}
