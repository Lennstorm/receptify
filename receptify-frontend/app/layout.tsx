import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import "./globals.css";

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
    <html lang="sv">
      <body className={cn("antialiased bg-white text-gray-900 dark:bg-gray-900 dark:text-white")}>
        {children}
      </body>
    </html>
  );
}
