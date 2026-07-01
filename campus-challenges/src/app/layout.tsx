import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { cn } from "@/src/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Campus Challenges",
  description: "Plateforme de défis pour étudiants",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={cn("font-sans", geist.variable)}>
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
          {children}
        </main>
      </body>
    </html>
  );
}
