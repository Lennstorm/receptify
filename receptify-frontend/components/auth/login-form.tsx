    // components/auth/login-form.tsx
    "use client";

    import { useForm } from "react-hook-form";
    import { mockUsers } from "@/lib/mockUsers"; //databas med låtsasdata! Ska ersättas av riktiga data från backend
    import { Button } from "@/components/ui/button";
    import { toast } from "sonner";
    import { FormField } from "@/components/form/form-field";
    import { User } from "@/lib/types";

    interface LoginFormData {
      email: string;
      password: string;
    }

    interface LoginFormProps {
      onSuccess?: () => void;
    }

    export default function LoginForm({ onSuccess }: LoginFormProps) {
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<LoginFormData>();

      const onSubmit = (data: LoginFormData) => {
        const user = mockUsers.find(
          (u: User) => u.email === data.email && u.password === data.password
        );

        if (user) {
          toast.success(`Välkommen ${user.name}!`);
          onSuccess?.();
        } else {
          toast.error("Fel e-post eller lösenord");
        }
      };

      return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            name="email"
            placeholder="Email"
            register={register("email", {
               required: "E-post krävs",
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Ogiltig e-postadress",
              },
            })}
            error={errors.email?.message as string}
          />
          <FormField
            name="password"
            type="password"
            placeholder="Lösenord"
            register={register("password", { required: "Lösenord krävs"})}
            error={errors.password?.message as string}
          />

          <Button type="submit" className="w-full">
            Logga in
          </Button>
        </form>
      );
    }
