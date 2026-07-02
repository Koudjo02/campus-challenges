"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogOut, User, Shield } from "lucide-react";
import Link from "next/link";

interface AuthButtonsProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  } | null;
}

export function AuthButtons({ user }: AuthButtonsProps) {
  if (!user) {
    return (
      <Button asChild variant="outline" size="sm" className="rounded-lg border-border/60 hover:border-primary/50 transition-colors">
        <Link href="/login">Connexion</Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-accent/60 transition-colors">
          <Avatar className="h-7 w-7 ring-2 ring-primary/30">
            <AvatarImage src={user.image || undefined} />
            <AvatarFallback className="text-xs bg-primary/10 text-primary font-bold">
              {user.name?.slice(0, 2).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium hidden sm:inline max-w-[100px] truncate">{user.name}</span>
          {user.role === "ADMIN" && (
            <Shield className="h-3.5 w-3.5 text-primary hidden sm:inline" />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 rounded-xl">
        <div className="px-3 py-2">
          <p className="text-sm font-semibold truncate">{user.name}</p>
          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          {user.role === "ADMIN" && (
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Admin</span>
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile" className="cursor-pointer">
            <User className="h-4 w-4 mr-2" /> Mon profil
          </Link>
        </DropdownMenuItem>
        {user.role === "ADMIN" && (
          <DropdownMenuItem asChild>
            <Link href="/admin" className="cursor-pointer">
              <Shield className="h-4 w-4 mr-2" /> Dashboard Admin
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => signOut({ callbackUrl: "/" })}
          className="text-destructive focus:text-destructive cursor-pointer"
        >
          <LogOut className="h-4 w-4 mr-2" /> Déconnexion
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
