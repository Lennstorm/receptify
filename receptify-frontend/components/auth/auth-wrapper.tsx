// components/auth/auth-wrapper.tsx  -- tänkt att användas för att växla mellan login och registerfunktion. Används ej i nuläget

"use client";

import { useState } from "react";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";
import { Button } from "@/components/ui/button";

export function AuthWrapper() {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {mode === "login" ? <LoginForm /> : <RegisterForm />}

      <div className="text-center">
        {mode === "login" ? (
          <>
            <p className="text-sm text-muted-foreground">Har du inget konto?</p>
            <Button
              variant="link"
              onClick={() => setMode("register")}
              className="text-sm"
            >
              Skapa konto
            </Button>
          </>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">
              Har du redan ett konto?
            </p>
            <Button
              variant="link"
              onClick={() => setMode("login")}
              className="text-sm"
            >
              Logga in
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
