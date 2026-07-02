import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfilePage() {
  return (
    <div className="container py-10 max-w-4xl">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3 space-y-6">
          <Card className="text-center overflow-hidden border-primary/10">
            <div className="h-24 bg-primary/10 w-full mb-12"></div>
            <CardContent className="relative px-6 pb-6 pt-0">
              <Avatar className="w-24 h-24 absolute -top-12 left-1/2 -translate-x-1/2 border-4 border-background shadow-sm">
                <AvatarImage src="" />
                <AvatarFallback className="text-3xl">U</AvatarFallback>
              </Avatar>
              <div className="mt-14">
                <h2 className="text-xl font-bold">Utilisateur Démo</h2>
                <p className="text-sm text-muted-foreground mt-1">user@demo.com</p>
                <div className="flex justify-center gap-4 mt-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold">0</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Défis</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">0</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Participations</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:w-2/3">
          <Card className="border-primary/10 shadow-sm">
            <CardHeader>
              <CardTitle>Éditer le profil</CardTitle>
              <CardDescription>Mettez à jour vos informations personnelles.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom complet</Label>
                    <Input id="name" name="name" defaultValue="Utilisateur Démo" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" defaultValue="user@demo.com" readOnly className="bg-muted/50" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio" 
                    name="bio" 
                    placeholder="Raconte-nous ton parcours..." 
                    className="min-h-[100px]"
                  />
                </div>
                <div className="pt-4 flex justify-end">
                  <Button type="submit">
                    Enregistrer les modifications
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
