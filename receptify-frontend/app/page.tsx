import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main
      className={cn(
        "flex min-h-screen flex-col items-center justify-center gap-6 p-6"
      )}
    >
      <h1 className="text-4xl font-bold tracking-tight">
        Välkommen till Receptify!
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        Samla, organisera och dela dina favoritrecept på ett smidigt sätt.
      </p>
      <button
        className={cn(
          "px-6 py-3 rounded-md bg-primary text-white font-medium hover:bg-primary/90"
        )}
      >
        Utforska recept
      </button>
    </main>
  );
}
