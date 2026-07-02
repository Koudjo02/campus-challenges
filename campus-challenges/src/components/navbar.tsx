import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { Trophy, Plus } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { AuthButtons } from "./auth-buttons";

export async function Navbar() {
  const session = await getServerSession(authOptions);
  const user = session?.user as any;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 glass">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Trophy className="h-4 w-4 text-primary" />
          </div>
          <span className="font-bold text-base tracking-tight hidden sm:inline">
            Campus <span className="text-gradient">Challenges</span>
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-1">
          <Link href="/" className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-all">
            Défis
          </Link>
          {session && (
            <Link href="/profile" className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-all">
              Profil
            </Link>
          )}
          {user?.role === "ADMIN" && (
            <Link href="/admin" className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-all">
              Admin
            </Link>
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {user?.role === "ADMIN" && (
            <Button asChild size="sm" className="gap-2 rounded-lg shadow-md shadow-primary/20 hidden sm:flex">
              <Link href="/challenges/create">
                <Plus className="h-4 w-4" />
                Créer un défi
              </Link>
            </Button>
          )}
          <AuthButtons user={user} />
        </div>
      </div>
    </header>
  );
}
