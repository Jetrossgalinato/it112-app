import { LoginForm } from "@/components/login-form";
import Header from "@/components/header";

export default function LoginPage() {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Header />
      <div className="bg-muted flex flex-1 flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-4xl">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
