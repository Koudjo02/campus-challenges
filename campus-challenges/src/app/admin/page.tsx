import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function AdminDashboard() {
  const usersCount = await prisma.user.count().catch(() => 0);
  const challengesCount = await prisma.challenge.count().catch(() => 0);
  const participationsCount = await prisma.participation.count().catch(() => 0);

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Admin</h1>
        <p className="text-muted-foreground">Vue d'ensemble de la plateforme Campus Challenges.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card className="border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Utilisateurs inscrits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{usersCount}</div>
          </CardContent>
        </Card>
        <Card className="border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Défis créés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{challengesCount}</div>
          </CardContent>
        </Card>
        <Card className="border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Participations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{participationsCount}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dernières actions</CardTitle>
          <CardDescription>Section en cours de développement.</CardDescription>
        </CardHeader>
        <CardContent className="h-32 flex items-center justify-center text-muted-foreground bg-muted/10 rounded-md border border-dashed m-6 mt-0">
          En attente de données...
        </CardContent>
      </Card>
    </div>
  );
}
