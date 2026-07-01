// src/components/Navbar.tsx
import Link from 'next/link';
import { Button } from "@/src/components/ui/button";

export default function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 py-3 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold tracking-tight">
          🎓 <span className="text-primary">Campus</span>Challenges
        </Link>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/">Défis</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/challenges/create">Créer un défi</Link>
          </Button>
          <Button variant="default" asChild>
            <Link href="/profile">Mon Profil</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}