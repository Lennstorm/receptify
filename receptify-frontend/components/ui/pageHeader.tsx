"use client";

import Image from "next/image";

export const PageHeader = () => {
  return (
    <header className="w-full">
      {/* Mobilbild */}
      <Image
        src="/mobHeadImg.png"
        alt="Headerbild mobil"
        width={768}
        height={300}
        className="w-full object-cover block sm:hidden"
        priority
      />

      {/* Desktopbild */}
      <Image
        src="/headerImg.png"
        alt="Headerbild desktop"
        width={1920}
        height={400}
        className="w-full object-cover hidden sm:block"
        priority
      />
    </header>
  );
};
