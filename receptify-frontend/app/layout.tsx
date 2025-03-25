// app/layout.tsx
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Receptify - Din digitala receptsamling",
  description: "Samla, organisera och dela recept enkelt och smidigt.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv" className="min-h-screen overflow-x-hidden bg-thistle">
      <body className={cn("min-h-screen antialiased bg-thistle text-gray-900 dark:bg-gray-900 dark:text-white")}>
        {children}
        <Toaster richColors /> 
      </body>
    </html>
  );
}
