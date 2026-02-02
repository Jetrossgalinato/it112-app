"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAlert } from "@/context/alert-context";

interface AuthResponse {
  detail?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export function useAuth() {
  const router = useRouter();
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );

      if (!response.ok) {
        const data: AuthResponse = await response.json();
        showAlert(data.detail || "An error occurred", "destructive");
        setLoading(false);
        return;
      }

      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));
      window.dispatchEvent(new Event("auth-change"));

      showAlert("Login successful!", "success");
      router.push("/logs");
    } catch (err) {
      console.error(err);
      showAlert("An error occurred", "destructive");
      setLoading(false);
    }
  };

  const register = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );

      if (!response.ok) {
        const data: AuthResponse = await response.json();
        throw new Error(data.detail || "Registration failed");
      }

      showAlert("Account created successfully", "success");
      router.push("/login?registered=true");
    } catch (err: unknown) {
      if (err instanceof Error) {
        showAlert(err.message, "destructive");
      } else {
        showAlert("An unexpected error occurred", "destructive");
      }
    } finally {
      setLoading(false);
    }
  };

  return { login, register, loading };
}
