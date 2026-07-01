// src/actions/user.ts
"use server"
import { prisma } from "../lib/prisma";

export async function createProfile(formData: FormData) {
  console.log("Vérification de Prisma :", Object.keys(prisma)); // <--- AJOUTE ÇA
  
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const bio = formData.get("bio") as string;

  try {
    return await prisma.user.create({
      data: { name, email, bio },
    });
  } catch (error) {
    console.error("Erreur détaillée :", error);
  }
}