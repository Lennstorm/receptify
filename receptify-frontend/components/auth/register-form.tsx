// components/auth/register-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { mockUsers } from "@/lib/mockUsers";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FormField } from "@/components/form/form-field";
import { User } from "@/lib/types";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit = (data: RegisterFormData) => {
    const exists = mockUsers.find((u: User) => u.email === data.email);
    if (exists) {
      toast.error("E-postadressen används redan");
    } else {
      toast.success("Registrering lyckades! (mock)");
      console.log("Skulle spara användare:", data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField
        name="name"
        placeholder="Namn"
        register={register}
        error={errors.name?.message as string}
      />
      <FormField
        name="email"
        placeholder="Email"
        register={register}
        error={errors.email?.message as string}
      />
      <FormField
        name="password"
        type="password"
        placeholder="Lösenord"
        register={register}
        error={errors.password?.message as string}
      />

      <Button type="submit" className="w-full">
        Registrera
      </Button>
    </form>
  );
}
