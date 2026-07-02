import { getChallengeById, submitParticipation } from "@/actions/challenge";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trophy, Clock, Send, ExternalLink, MessageSquare, Lock } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export default async function ChallengeDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const [challenge, session] = await Promise.all([
    getChallengeById(params.id),
    getServerSession(authOptions),
  ]);

  if (!challenge) notFound();

  const user = session?.user as any;

  return (
    <div className="container py-10 max-w-5xl px-4 md:px-8">
      <div className="fixed -top-40 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="grid gap-8 md:grid-cols-3">
        {/* ── Colonne principale ── */}
        <div className="md:col-span-2 space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-primary/10 text-primary border-primary/20 rounded-full px-3 uppercase text-[10px] tracking-widest">Défi</Badge>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {formatDistanceToNow(new Date(challenge.createdAt), { addSuffix: true, locale: fr })}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-4">{challenge.title}</h1>

            <div className="flex items-center gap-2 mb-6">
              <Avatar className="h-7 w-7 ring-2 ring-border">
                <AvatarImage src={challenge.author.image || undefined} />
                <AvatarFallback className="text-xs bg-primary/10 text-primary">
                  {challenge.author.name?.slice(0, 2).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">
                Lancé par <span className="font-semibold text-foreground">{challenge.author.name || "Admin"}</span>
              </span>
            </div>

            <div className="bg-muted/30 border border-border/50 rounded-2xl p-6">
              <p className="text-base leading-relaxed whitespace-pre-wrap">{challenge.description}</p>
            </div>
          </div>

          {/* Participations */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" /> Participations
              </h2>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 rounded-full">
                {challenge.participations.length}
              </Badge>
            </div>

            {challenge.participations.length === 0 ? (
              <div className="text-center py-14 border border-dashed border-border rounded-2xl bg-muted/10">
                <Trophy className="h-10 w-10 mx-auto text-muted-foreground/40 mb-3" />
                <p className="font-medium text-muted-foreground">Aucune participation pour l'instant.</p>
                <p className="text-sm text-muted-foreground/70 mt-1">Sois le premier à relever ce défi !</p>
              </div>
            ) : (
              <div className="space-y-4">
                {challenge.participations.map((part, i) => (
                  <Card key={part.id} className="rounded-2xl border border-border/60 overflow-hidden hover:border-primary/30 transition-colors">
                    {i === 0 && <div className="h-0.5 w-full bg-gradient-to-r from-primary/60 via-purple-500/60 to-transparent" />}
                    <CardHeader className="pb-3 pt-4 px-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <Avatar className="h-8 w-8 ring-1 ring-border">
                            <AvatarImage src={part.user.image || undefined} />
                            <AvatarFallback className="text-xs bg-primary/10 text-primary">
                              {part.user.name?.slice(0, 2).toUpperCase() || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-semibold leading-none">{part.user.name || "Étudiant"}</p>
                            <p className="text-[11px] text-muted-foreground mt-0.5">
                              {formatDistanceToNow(new Date(part.createdAt), { addSuffix: true, locale: fr })}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="rounded-full gap-1 text-xs border-border/60 text-muted-foreground">
                          ▲ {part._count.votes}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="px-5 pb-4">
                      <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">{part.text}</p>
                      {part.link && (
                        <a href={part.link} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 mt-3 text-sm text-primary hover:underline font-medium">
                          <ExternalLink className="h-3.5 w-3.5" /> Voir la réalisation
                        </a>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Sidebar ── */}
        <div>
          <Card className="sticky top-20 rounded-2xl border border-primary/20 shadow-lg shadow-primary/5 overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-primary via-purple-500 to-primary/50" />
            <CardHeader className="bg-primary/5 border-b border-primary/10 px-5 py-4">
              <h3 className="font-bold text-base flex items-center gap-2">
                <Send className="h-4 w-4 text-primary" /> Participer
              </h3>
              <p className="text-xs text-muted-foreground">Soumets ta solution pour ce défi.</p>
            </CardHeader>
            <CardContent className="pt-5 px-5 pb-6">
              {!session ? (
                /* Non connecté */
                <div className="text-center py-4">
                  <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center mx-auto mb-3">
                    <Lock className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Tu dois être connecté pour participer à ce défi.
                  </p>
                  <Button asChild className="w-full rounded-xl font-bold">
                    <Link href="/login">Se connecter</Link>
                  </Button>
                </div>
              ) : (
                /* Connecté */
                <form action={submitParticipation} className="space-y-4">
                  <input type="hidden" name="challengeId" value={challenge.id} />
                  <input type="hidden" name="userId" value={user?.id} />

                  <div className="space-y-1.5">
                    <Label htmlFor="text" className="text-sm font-semibold">Ta solution</Label>
                    <Textarea id="text" name="text" placeholder="Décris ton approche, ta solution..."
                      className="min-h-[130px] resize-none rounded-xl border-border/70 focus-visible:ring-primary/50 text-sm" required />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="link" className="text-sm font-semibold">
                      Lien <span className="text-muted-foreground font-normal">(optionnel)</span>
                    </Label>
                    <Input id="link" name="link" type="url" placeholder="https://github.com/..."
                      className="rounded-xl border-border/70 focus-visible:ring-primary/50 h-10 text-sm" />
                  </div>

                  <Button type="submit" className="w-full rounded-xl h-11 font-bold shadow-md shadow-primary/20">
                    <Send className="h-4 w-4 mr-2" /> Soumettre
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
