"use client";

import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { registerUser } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Trophy, LogIn, UserPlus, Loader2 } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

function LoginContent() {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    const email = fd.get("email") as string;
    const password = fd.get("password") as string;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Email ou mot de passe incorrect.");
    } else {
      router.push("/");
      router.refresh();
    }
  };

  const handleRegister = (formData: FormData) => {
    startTransition(async () => {
      try {
        await registerUser(formData);
      } catch (err: any) {
        setError(err.message || "Erreur lors de l'inscription.");
      }
    });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 relative">
      <div className="absolute -top-40 right-1/4 w-80 h-80 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Trophy className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xl font-extrabold tracking-tight">
              Campus <span className="text-gradient">Challenges</span>
            </span>
          </Link>
          <p className="text-muted-foreground text-sm mt-3">
            {tab === "login" ? "Connecte-toi pour participer aux défis" : "Crée ton compte étudiant"}
          </p>
        </div>

        <Card className="rounded-2xl border border-border/60 shadow-xl shadow-primary/5 overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-primary via-purple-500 to-primary/40" />

          {/* Tabs */}
          <CardHeader className="p-0">
            <div className="grid grid-cols-2 border-b border-border/60">
              <button
                onClick={() => { setTab("login"); setError(""); }}
                className={`py-3.5 text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                  tab === "login"
                    ? "text-primary border-b-2 border-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <LogIn className="h-4 w-4" /> Connexion
              </button>
              <button
                onClick={() => { setTab("register"); setError(""); }}
                className={`py-3.5 text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                  tab === "register"
                    ? "text-primary border-b-2 border-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <UserPlus className="h-4 w-4" /> Inscription
              </button>
            </div>
          </CardHeader>

          <CardContent className="p-6 pt-6">
            {/* Feedback messages */}
            {registered && tab === "login" && (
              <div className="mb-4 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm">
                ✅ Compte créé ! Tu peux te connecter.
              </div>
            )}
            {error && (
              <div className="mb-4 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                {error}
              </div>
            )}

            {/* Login Form */}
            {tab === "login" && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-sm font-semibold">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="tu@email.com" required
                    className="h-11 rounded-xl border-border/70 focus-visible:ring-primary/50" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-sm font-semibold">Mot de passe</Label>
                  <Input id="password" name="password" type="password" placeholder="••••••••" required
                    className="h-11 rounded-xl border-border/70 focus-visible:ring-primary/50" />
                </div>
                <Button type="submit" className="w-full h-11 rounded-xl font-bold mt-2 shadow-md shadow-primary/20">
                  <LogIn className="h-4 w-4 mr-2" /> Se connecter
                </Button>
                <p className="text-center text-xs text-muted-foreground mt-2">
                  Admin de démo : <span className="font-mono text-primary">admin@campus.fr</span> / <span className="font-mono text-primary">admin123</span>
                </p>
              </form>
            )}

            {/* Register Form */}
            {tab === "register" && (
              <form action={handleRegister} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="reg-name" className="text-sm font-semibold">Nom complet</Label>
                  <Input id="reg-name" name="name" placeholder="Jean Dupont" required
                    className="h-11 rounded-xl border-border/70 focus-visible:ring-primary/50" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="reg-email" className="text-sm font-semibold">Email</Label>
                  <Input id="reg-email" name="email" type="email" placeholder="tu@email.com" required
                    className="h-11 rounded-xl border-border/70 focus-visible:ring-primary/50" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="reg-password" className="text-sm font-semibold">Mot de passe</Label>
                  <Input id="reg-password" name="password" type="password" placeholder="••••••••" required minLength={6}
                    className="h-11 rounded-xl border-border/70 focus-visible:ring-primary/50" />
                </div>
                <Button type="submit" disabled={isPending} className="w-full h-11 rounded-xl font-bold mt-2 shadow-md shadow-primary/20">
                  {isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <UserPlus className="h-4 w-4 mr-2" />}
                  Créer mon compte
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}
