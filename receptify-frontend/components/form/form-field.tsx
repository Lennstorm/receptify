// components/form/form-field.tsx
"use client";

import { Input } from "@/components/ui/input";
import { InputError } from "./input-error";

interface FormFieldProps {
  label?: string;
  type?: string;
  placeholder: string;
  register: any;
  error?: string;
  name: string;
}

export const FormField = ({
  label,
  type = "text",
  placeholder,
  register,
  error,
  name,
}: FormFieldProps) => {
  return (
    <div className="space-y-1">
      {label && <label htmlFor={name}>{label}</label>}
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
      />
      <InputError message={error} />
    </div>
  );
};
