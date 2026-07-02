import { getChallenges } from "@/actions/challenge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { Users, Zap, Trophy, ArrowRight } from "lucide-react";

export default async function Home() {
  const challenges = await getChallenges();

  return (
    <div className="flex flex-col min-h-full">
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden py-20 md:py-32 px-4">
        {/* Gradient blobs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="container relative text-center">
          <Badge variant="secondary" className="mb-6 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-primary/10 text-primary border-primary/20">
            🏆 Plateforme Étudiante
          </Badge>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Relève des <span className="text-gradient">Défis</span>,<br />
            Prouve tes Skills.
          </h1>

          <p className="max-w-xl mx-auto text-lg text-muted-foreground mb-10">
            Une mini-plateforme où des étudiants créent des défis, y participent et se démarquent. Montre ce que tu sais faire.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="rounded-xl px-8 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow font-bold">
              <Link href="/challenges/create">
                <Zap className="h-4 w-4 mr-2" /> Lancer un défi
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-xl px-8 border-border/70 hover:border-primary/50 transition-colors">
              <Link href="#challenges">
                Voir les défis <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-16 text-center">
            {[
              { icon: Trophy, label: "Défis", value: challenges.length },
              { icon: Users, label: "Participants", value: challenges.reduce((a, c) => a + c._count.participations, 0) },
              { icon: Zap, label: "Actifs", value: "∞" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2 text-3xl font-extrabold">
                  <Icon className="h-6 w-6 text-primary" />
                  <span>{value}</span>
                </div>
                <span className="text-sm text-muted-foreground uppercase tracking-wider">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Challenges Grid ── */}
      <section id="challenges" className="container pb-20 px-4 md:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Défis récents</h2>
            <p className="text-sm text-muted-foreground mt-1">Rejoins la compétition</p>
          </div>
          <Button asChild variant="outline" size="sm" className="hidden sm:flex rounded-lg border-border/60">
            <Link href="/challenges/create">+ Créer</Link>
          </Button>
        </div>

        {challenges.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-border rounded-2xl bg-muted/20">
            <Trophy className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Aucun défi encore</h3>
            <p className="text-muted-foreground text-sm mb-6">Sois le premier à lancer un défi !</p>
            <Button asChild className="rounded-xl">
              <Link href="/challenges/create">Créer le premier défi</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {challenges.map((challenge) => (
              <Card
                key={challenge.id}
                className="hover-lift flex flex-col rounded-2xl border border-border/60 bg-card overflow-hidden group"
              >
                {/* Top accent bar */}
                <div className="h-1 w-full bg-gradient-to-r from-primary/60 via-purple-500/60 to-primary/30 opacity-0 group-hover:opacity-100 transition-opacity" />

                <CardHeader className="pb-3 pt-5">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="text-[10px] uppercase tracking-widest bg-primary/10 text-primary border-primary/20 rounded-full px-2.5">
                      Défi
                    </Badge>
                    <span className="text-[11px] text-muted-foreground">
                      {formatDistanceToNow(new Date(challenge.createdAt), { addSuffix: true, locale: fr })}
                    </span>
                  </div>
                  <CardTitle className="text-base font-bold line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                    {challenge.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-1 pb-4">
                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {challenge.description}
                  </p>
                </CardContent>

                <CardFooter className="flex items-center justify-between pt-3 border-t border-border/50 bg-muted/20 px-5 pb-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6 ring-1 ring-border">
                      <AvatarImage src={challenge.author.image || undefined} />
                      <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                        {challenge.author.name?.slice(0, 2).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium text-muted-foreground">{challenge.author.name || "Anonyme"}</span>
                  </div>

                  <Button asChild variant="ghost" size="sm" className="h-7 gap-1.5 rounded-lg text-xs hover:bg-primary/10 hover:text-primary transition-colors">
                    <Link href={`/challenges/${challenge.id}`}>
                      Voir
                      <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-primary/10 text-primary text-[10px] font-bold">
                        {challenge._count.participations}
                      </span>
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
