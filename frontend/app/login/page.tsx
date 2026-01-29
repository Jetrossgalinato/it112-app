import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to sign in to your account
          </p>
        </div>
        <div className="grid gap-6">
          <form>
            <div className="grid gap-2">
              <div className="grid gap-1">
                {/* Add inputs here later */}
              </div>
              <Button disabled>
                Sign In with Email
              </Button>
            </div>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Button variant="outline" asChild>
             <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
