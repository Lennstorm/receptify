// components/form/input-error.tsx
"use client";

interface InputErrorProps {
  message?: string;
}

export const InputError = ({ message }: InputErrorProps) => {
  if (!message) return null;
  return <p className="text-red-500 text-sm">{message}</p>;
};