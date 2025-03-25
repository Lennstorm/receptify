// components/ui/pageFooter.tsx

"use client";

import Link from "next/link";

export const PageFooter = () => {
  return (
    <footer className="w-full mt-10 p-4 bg-transparent text-center text-sm text-gray-600">
      <nav className="flex flex-wrap justify-center gap-4">
        <Link href="/" className="hover:text-secondary transition-colors">
          Start
        </Link>
        <Link href="/login" className="hover:text-secondary transition-colors">
          Logga in
        </Link>
        <Link
          href="/register"
          className="hover:text-secondary transition-colors"
        >
          Registrera
        </Link>
        <Link
          href="/recipe/new"
          className="hover:text-secondary transition-colors"
        >
          Nytt recept
        </Link>
        <Link
          href="/recipe/new/instructions"
          className="hover:text-secondary transition-colors"
        >
          Instruktioner
        </Link>
        <Link href="/recipe" className="hover:text-secondary transition-colors">
          Alla recept
        </Link>
      </nav>
    </footer>
  );
};
