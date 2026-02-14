"use client";

import { useAuth } from "@/hooks/use-auth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, initializing } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (initializing) return;

    const isAuthRoute = ["/login", "/register"].some((route) =>
      pathname.startsWith(route),
    );
    const isProtectedRoute = pathname.startsWith("/logs") || pathname.startsWith("/profile");

    if (user && isAuthRoute) {
      router.push("/");
    } else if (!user && isProtectedRoute) {
      router.push("/login");
    }
  }, [user, initializing, pathname, router]);

  if (initializing) {
    const isAuthRoute = ["/login", "/register"].some((route) =>
      pathname.startsWith(route),
    );
    const isProtectedRoute = pathname.startsWith("/logs") || pathname.startsWith("/profile");

    if (isAuthRoute || isProtectedRoute) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      );
    }
  }

  // Prevent rendering if we are about to redirect
  if (!initializing) {
    const isAuthRoute = ["/login", "/register"].some((route) =>
      pathname.startsWith(route),
    );
    const isProtectedRoute = pathname.startsWith("/logs") || pathname.startsWith("/profile");

    if (user && isAuthRoute) return null;
    if (!user && isProtectedRoute) return null;
  }

  return <>{children}</>;
}
