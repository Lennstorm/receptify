// app/register/page.tsx
import { PageHeader } from "@/ui/pageHeader";
import { PageFooter } from "@/ui/pageFooter";
import RegisterForm from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <main className="w-full flex flex-col min-h-screen items-center">
      <PageHeader />
      <div className="flex-1 flex items-center justify-center w-full">
        <RegisterForm />
      </div>
      <PageFooter />
    </main>
  );
}
