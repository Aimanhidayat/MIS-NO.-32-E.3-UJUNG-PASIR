"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { logout } from "@/app/login/actions";
import { User } from "@supabase/supabase-js";

interface NavLink {
  name: string;
  href: string;
}

interface MobileNavProps {
  navLinks: NavLink[];
  user: User | null;
}

export default function MobileNav({ navLinks, user }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        className="p-2 text-foreground"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div className="absolute inset-x-0 top-16 border-t p-4 bg-background shadow-lg">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-foreground hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <>
                <Link href="/dashboard" className="text-sm font-medium text-foreground hover:text-primary" onClick={() => setIsOpen(false)}>
                  Dashboard
                </Link>
                <form action={logout}>
                  <button type="submit" className={buttonVariants({ variant: "ghost", className: "w-full justify-start" })}>
                    Logout
                  </button>
                </form>
              </>
            ) : (
              <Link href="/login">
                <button className={buttonVariants({ variant: "default", className: "w-full bg-primary hover:bg-primary/90" })} onClick={() => setIsOpen(false)}>
                  Login Admin
                </button>
              </Link>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}