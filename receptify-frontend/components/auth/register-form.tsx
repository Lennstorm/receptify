// components/auth/register-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { mockUsers } from "@/lib/mockUsers";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FormField } from "@/components/form/form-field";
import { User } from "@/lib/types";

const INVITE_CODE = "ole-dole-doff"; // EVENTUELLT FLYTTA TILL MILJÖVARIABEL!!
interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  inviteCode: string;
}

interface RegisterFormProps {
  onSuccess?: () => void;
}

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit = (data: RegisterFormData) => {
    if (data.inviteCode !== INVITE_CODE) {
      toast.error("Felaktig inbjudningskod");
      return;
    }

    const exists = mockUsers.find((u: User) => u.email === data.email);
    if (exists) {
      toast.error("E-postadressen används redan");
    } else {
      toast.success("Registrering lyckades! (mock)");
      console.log("Skulle spara användare:", data);
      onSuccess?.();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField
        name="name"
        placeholder="Namn"
        register={register("name", { required: "Namn krävs"})}
        error={errors.name?.message as string}
      />
      <FormField
        name="email"
        placeholder="Email"
        register={register("email", { required: "E-post krävs"})}
        error={errors.email?.message as string}
      />
      <FormField
        name="password"
        type="password"
        placeholder="Lösenord"
        register={register("password", { required: "Lösenord krävs"})}
        error={errors.password?.message as string}
      />

      <FormField
        name="inviteCode"
        placeholder="Inbjudningskod"
        register={register("inviteCode", { required: "Inbjudningskod krävs"})}
        error={errors.inviteCode?.message as string}
      />

      <Button type="submit" className="w-full">
        Registrera
      </Button>
    </form>
  );
}
