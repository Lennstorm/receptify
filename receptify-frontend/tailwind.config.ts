import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        josefin: ['"Josefin Sans"', "sans-serif"]
      },
      colors: {
        amaranthpink: "#DA9BB9",       // Bakgrundsfärg
        thistle: "#DFD0E2",            // Bakgrundsfärg
        primary: "#25897D",            // Tidigare oklch(0.2 0.1 120) – blågrön
        secondary: "#E79C4F",          // Tidigare oklch(0.7 0.1 60) – orange
        border: "#EBEBEB",             // Ljusgrå ramfärg
      },
      borderRadius: {
        xl: "0.75rem",
      },
    },
  },
  plugins: [],
};

export default config;