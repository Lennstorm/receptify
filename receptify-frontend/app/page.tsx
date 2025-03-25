// app/page.tsx
import Link from "next/link";

export default function LandingPage() {
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
          <Link
            href="/login"
            className="block hover:pointer hover:text-secondary"
          >
            Logga in
          </Link>
          <Link
            href="/register"
            className="block hover:pointer hover:text-secondary"
          >
            Registrera
          </Link>
        </div>
      </div>
    </main>
  );
}
