// app/layout.tsx
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Receptify - Laga med kärlek!",
  description: "Samla, organisera och dela recept enkelt och smidigt.",
  icons: {
    icon: "/favicon.svg"
  },
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
        <Toaster position="top-center" duration={2000} richColors /> 
      </body>
    </html>
  );
}
