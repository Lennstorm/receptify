import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // Mörkt läge aktiveras med .dark på <html>
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "oklch(0.2 0.1 120)", // Blågrön
        secondary: "oklch(0.7 0.1 60)", // Orange
        border  : "var(--border)",
      },
      borderRadius: {
        xl: "0.75rem",
      },
    },
  },
  plugins: [],
};

export default config;
