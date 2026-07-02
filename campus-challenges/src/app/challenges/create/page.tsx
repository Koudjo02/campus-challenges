import { createChallenge } from "@/actions/challenge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Zap, ShieldX } from "lucide-react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function CreateChallengePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user as any;

  // Redirect non-authenticated users to login
  if (!session) {
    redirect("/login");
  }

  // Block non-admin users
  if (user?.role !== "ADMIN") {
    return (
      <div className="container py-20 max-w-lg text-center">
        <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-6">
          <ShieldX className="h-8 w-8 text-destructive" />
        </div>
        <h1 className="text-2xl font-extrabold mb-2">Accès refusé</h1>
        <p className="text-muted-foreground mb-6">
          Seuls les administrateurs peuvent créer des défis.
        </p>
        <Button asChild variant="outline" className="rounded-xl">
          <Link href="/">← Retour aux défis</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-12 max-w-2xl relative">
      <div className="absolute -top-20 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="relative">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 text-primary mb-3">
            <Zap className="h-4 w-4" />
            <span className="text-sm font-semibold uppercase tracking-widest">Admin · Nouveau défi</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Lancer un défi</h1>
          <p className="text-muted-foreground mt-2">
            Crée un défi pour mettre les étudiants à l'épreuve.
          </p>
        </div>

        <Card className="border border-border/60 rounded-2xl shadow-sm">
          <CardContent className="pt-8 pb-8 px-8">
            <form action={createChallenge} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="font-semibold text-sm">
                  Titre du défi <span className="text-destructive">*</span>
                </Label>
                <Input id="title" name="title" placeholder="Ex : Créer une API REST en Node.js" required
                  className="h-12 rounded-xl border-border/70 focus-visible:ring-primary/50 text-base" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="font-semibold text-sm">
                  Description <span className="text-destructive">*</span>
                </Label>
                <Textarea id="description" name="description"
                  placeholder="Décris les règles, les technologies, les objectifs attendus..."
                  className="min-h-[220px] rounded-xl border-border/70 focus-visible:ring-primary/50 resize-y text-base leading-relaxed" required />
              </div>

              <div className="flex gap-3 pt-2">
                <Button asChild variant="outline" className="flex-1 rounded-xl border-border/70 h-12">
                  <Link href="/">Annuler</Link>
                </Button>
                <Button type="submit" className="flex-[2] rounded-xl h-12 font-bold text-base shadow-lg shadow-primary/25">
                  <Zap className="h-4 w-4 mr-2" /> Publier le défi
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
