// app/user/page.tsx

"use client";

import { PageHeader } from "@/ui/pageHeader";
import { PageFooter } from "@/ui/pageFooter";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UserPage() {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <main className="min-h-screen w-full bg-thistle flex flex-col overflow-x-hidden p-0">
      <PageHeader />

      {/* Centrera nav i resterande utrymme */}
      <div className="flex-1 flex items-center justify-center">
        <nav className="flex flex-col gap-10 text-xl sm:text-2xl md:text-3xl font-medium text-black text-center">
          <Link href="/recipes" className="hover:text-secondary">
            Mina recept
          </Link>
          <Link href="/recipes/new" className="hover:text-secondary">
            Nytt recept
          </Link>
          <Link href="/settings" className="hover:text-secondary">
            Inställningar
          </Link>
          <button onClick={handleLogout} className="hover:text-secondary">
            Logga ut
          </button>
        </nav>
      </div>
      <PageFooter />
    </main>
  );
}
