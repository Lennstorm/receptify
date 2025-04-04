// components/auth/auth-wrapper.tsx  -- tänkt att användas för att växla mellan login och registerfunktion. Används ej i nuläget

"use client";

import { useState } from "react";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";
import { Button } from "@/components/ui/button";

interface AuthWrapperProps {
  initialMode?: "login" | "register";
  onSuccess?: () => void;
}

export default function AuthWrapper({ initialMode = "login", onSuccess }: AuthWrapperProps) {
  const [mode, setMode] = useState<"login" | "register">(initialMode);

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {mode === "login" 
        ? <LoginForm onSuccess={onSuccess} /> 
        : <RegisterForm onSuccess={onSuccess} />
        }

        {/* Växla mellan formulär */}
      <div className="text-center">
        {mode === "login" ? (
          <>
            <p className="text-sm text-gray-700">Har du inget konto?</p>
            <Button
              variant="link"
              onClick={() => setMode("register")}
              className="text-sm"
            >
              Gå till registrering
            </Button>
          </>
        ) : (
          <>
            <p className="text-sm text-gray-700">
              Har du redan ett konto?
            </p>
            <Button
              variant="link"
              onClick={() => setMode("login")}
              className="text-sm"
            >
              Gå till inloggning
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
