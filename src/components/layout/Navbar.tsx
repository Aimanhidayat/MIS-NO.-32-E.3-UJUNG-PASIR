import Link from "next/link";
import { Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { logout } from "@/app/login/actions";
import MobileNav from "./MobileNav"; // We will create this component

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
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Logo Placeholder */}
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xs">
            MIS
          </div>
          <Link href="/" className="font-heading font-bold text-lg text-primary">
            MIS Ujung Pasir
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.name}
            </Link>
          ))}
          {user ? (
            <>
              <Link href="/dashboard" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                Dashboard
              </Link>
              <form action={logout}>
                <button type="submit" className={buttonVariants({ variant: "ghost", size: "sm" })}>
                  Logout
                </button>
              </form>
            </>
          ) : (
            <Link href="/login" className={buttonVariants({ variant: "default", className: "bg-primary hover:bg-primary/90" })}>
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
