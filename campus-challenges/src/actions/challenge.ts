"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function getChallenges(search?: string) {
  try {
    const challenges = await prisma.challenge.findMany({
      where: search ? {
        title: { contains: search, mode: "insensitive" }
      } : undefined,
      include: {
        author: { select: { name: true, image: true } },
        _count: { select: { participations: true } }
      },
      orderBy: { createdAt: "desc" }
    });
    return challenges;
  } catch (error) {
    console.error("Failed to fetch challenges", error);
    return [];
  }
}

export async function getChallengeById(id: string) {
  try {
    const challenge = await prisma.challenge.findUnique({
      where: { id },
      include: {
        author: { select: { name: true, image: true } },
        participations: {
          include: {
            user: { select: { name: true, image: true } },
            _count: { select: { votes: true } }
          },
          orderBy: { createdAt: "desc" }
        }
      }
    });
    return challenge;
  } catch (error) {
    console.error("Failed to fetch challenge", error);
    return null;
  }
}

async function getOrCreateDemoUser() {
  const existing = await prisma.user.findUnique({
    where: { email: "demo@campus-challenges.fr" }
  });
  if (existing) return existing;

  return await prisma.user.create({
    data: {
      id: "user-demo-id",
      name: "Utilisateur Démo",
      email: "demo@campus-challenges.fr",
      role: "USER",
    }
  });
}

export async function createChallenge(formData: FormData) {
  const { getServerSession } = await import("next-auth");
  const { authOptions } = await import("@/lib/auth");
  const session = await getServerSession(authOptions);
  const user = session?.user as any;

  if (!session || user?.role !== "ADMIN") {
    throw new Error("Accès refusé");
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  if (!title || !description) throw new Error("Champs manquants");

  await prisma.challenge.create({
    data: { title, description, authorId: user.id }
  });

  revalidatePath("/");
}

export async function submitParticipation(formData: FormData) {
  const { getServerSession } = await import("next-auth");
  const { authOptions } = await import("@/lib/auth");
  const session = await getServerSession(authOptions);
  const user = session?.user as any;

  if (!session || !user?.id) throw new Error("Connecte-toi pour participer.");

  const text = formData.get("text") as string;
  const link = formData.get("link") as string;
  const challengeId = formData.get("challengeId") as string;

  if (!text || !challengeId) throw new Error("Champs manquants");

  await prisma.participation.create({
    data: { text, link: link || null, challengeId, userId: user.id }
  });

  revalidatePath(`/challenges/${challengeId}`);
}
