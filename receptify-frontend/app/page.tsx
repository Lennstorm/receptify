// app/page.tsx

"use client"

import Link from "next/link";
import { useState } from "react";
import AuthModal from "@/auth/auth-modal";
import AuthWrapper from "@/auth/auth-wrapper";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const openModal = (mode: "login" | "register") => {
    setAuthMode(mode);
    setShowModal(true);
  };

  return (
    <main
      className="relative min-h-screen bg-no-repeat bg-cover bg-right sm:bg-center text-white
                 bg-[url('/receptifyBgImgMob.png')] sm:bg-[url('/receptifyBgImg.jpg')]"
    >
      <div className="absolute top-[68%] left-[70%] sm:top-[70%] sm:left-[56%] -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="font-josefin font-bold mb-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl drop-shadow-lg">
          Receptifiera
        </h1>
        <div className="space-y-4 text-lg sm:text-xl md:text-2xl lg:text-3xl drop-shadow">
        <button
            onClick={() => openModal("login")}
            className="block w-full text-center bg-transparent border-none hover:text-secondary transition-colors"

          >
            Logga in
          </button>
          <button
            onClick={() => openModal("register")}
            className="block w-full text-center bg-transparent border-none hover:text-secondary transition-colors"

          >
            Registrera
          </button>

        </div>
      </div>
      {showModal && (
        <AuthModal onClose={() => setShowModal(false)}>
          <AuthWrapper 
            initialMode={authMode} 
            onSuccess={() => {
              setShowModal(false)
              router.push("/user")
          }} />
        </AuthModal>
      )}
    </main>
  );
}
