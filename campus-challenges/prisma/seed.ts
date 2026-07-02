import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Admin user
  const adminPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@campus.fr" },
    update: {},
    create: {
      name: "Admin Campus",
      email: "admin@campus.fr",
      password: adminPassword,
      role: "ADMIN",
    },
  });
  console.log("✅ Admin créé:", admin.email);

  // IT Challenges
  const challenges = [
    {
      title: "Construis une API REST en Node.js / Express",
      description: `🎯 Objectif : Créer une API REST complète avec Node.js et Express.

📋 Exigences :
- Endpoints CRUD pour une ressource de ton choix (users, posts, produits...)
- Connexion à une base de données (MongoDB, PostgreSQL ou SQLite)
- Validation des données avec Zod ou Joi
- Gestion des erreurs HTTP (400, 401, 404, 500)
- Documentation avec Swagger ou README détaillé

🏆 Bonus : Ajouter une authentification JWT, des tests unitaires avec Jest, déploiement sur Railway ou Render.

⏱️ Durée estimée : 4 à 8 heures`,
    },
    {
      title: "Clone une page de Netflix avec React",
      description: `🎯 Objectif : Reproduire fidèlement l'interface de Netflix en utilisant React.

📋 Exigences :
- Page d'accueil avec hero section et carousels de films
- Utilisation de l'API TMDB (gratuite) pour les vraies données
- Routing entre les pages (accueil, détail du film)
- Design responsive (mobile + desktop)
- Animations fluides sur les cartes

🏆 Bonus : Système de favoris avec localStorage, trailer en modal via YouTube API, dark/light mode.

⏱️ Durée estimée : 6 à 12 heures`,
    },
    {
      title: "Algorithme de tri : visualise le Bubble Sort",
      description: `🎯 Objectif : Créer une visualisation interactive d'un algorithme de tri.

📋 Exigences :
- Afficher un tableau de barres de hauteur aléatoire
- Visualiser en temps réel le tri Bubble Sort avec des animations
- Boutons : Play, Pause, Reset, Générer nouveau tableau
- Contrôle de la vitesse de l'animation
- Affichage du nombre de comparaisons et échanges

🏆 Bonus : Ajouter d'autres algorithmes (Quick Sort, Merge Sort, Insertion Sort) avec un sélecteur, comparer les performances.

⏱️ Durée estimée : 2 à 5 heures`,
    },
    {
      title: "Crée un chatbot IA avec l'API OpenAI",
      description: `🎯 Objectif : Développer une interface de chat connectée à GPT.

📋 Exigences :
- Interface de chat moderne et responsive
- Connexion à l'API OpenAI (GPT-3.5 ou GPT-4)
- Historique de conversation maintenu dans la session
- Indicateur de chargement pendant les réponses
- Gestion des erreurs API

🏆 Bonus : Personnalité configurable (system prompt), export de la conversation en PDF, support Markdown dans les réponses, mode vocal.

⏱️ Durée estimée : 3 à 6 heures`,
    },
    {
      title: "Système d'authentification full-stack sécurisé",
      description: `🎯 Objectif : Implémenter un système d'auth complet de A à Z.

📋 Exigences :
- Inscription avec validation (email, mot de passe fort)
- Connexion avec JWT (access token + refresh token)
- Hachage des mots de passe (bcrypt)
- Routes protégées côté serveur
- Déconnexion et invalidation des tokens

🏆 Bonus : OAuth2 (Google ou GitHub), 2FA par email, protection contre les attaques brute force (rate limiting), oubli de mot de passe.

⏱️ Durée estimée : 6 à 10 heures`,
    },
    {
      title: "Dashboard de monitoring en temps réel",
      description: `🎯 Objectif : Créer un tableau de bord avec des données mises à jour en temps réel.

📋 Exigences :
- Graphiques de métriques (CPU, RAM, requêtes...)
- Mise à jour en temps réel via WebSockets ou SSE
- Au moins 4 types de graphiques différents (Chart.js ou Recharts)
- Filtres par période (1h, 24h, 7j, 30j)
- Responsive et accessible

🏆 Bonus : Alertes configurables par seuil, export CSV des données, dark mode, notifications push.

⏱️ Durée estimée : 8 à 15 heures`,
    },
  ];

  for (const challenge of challenges) {
    const existing = await prisma.challenge.findFirst({
      where: { title: challenge.title },
    });

    if (!existing) {
      await prisma.challenge.create({
        data: {
          ...challenge,
          authorId: admin.id,
        },
      });
      console.log("✅ Défi créé:", challenge.title.slice(0, 50) + "...");
    }
  }

  console.log("\n🎉 Seeding terminé !");
  console.log("👤 Admin : admin@campus.fr / admin123");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
