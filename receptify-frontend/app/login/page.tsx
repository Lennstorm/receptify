// app/login/page.tsx
import { PageHeader } from "@/ui/pageHeader";
import LoginForm from "@/components/auth/login-form";
import { PageFooter } from "@/components/ui/pageFooter";

export default function LoginPage() {
  return (
    <main className="w-full flex flex-col min-h-screen items-center ">
      <PageHeader />
      <div className="flex-1 flex items-center justify-center w-full">
        <LoginForm />
      </div>
      <PageFooter />
    </main>
  );
}
