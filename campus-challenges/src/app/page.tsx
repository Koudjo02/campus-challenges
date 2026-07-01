// src/app/profile/page.tsx
import { createProfile } from "../actions/user";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";

export default function ProfilePage() {
  return (
    <div className="max-w-md mx-auto mt-10 p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Créer mon Profil Étudiant</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createProfile} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet</Label>
              <Input id="name" name="name" placeholder="Jean Dupont" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="jean@univ.fr" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio (Optionnel)</Label>
              <Textarea id="bio" name="bio" placeholder="Raconte-nous ton parcours..." />
            </div>
            <Button type="submit" className="w-full">
              Enregistrer mon profil
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}