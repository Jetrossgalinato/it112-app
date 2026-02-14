"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAlert } from "@/context/alert-context";

interface AuthResponse {
  detail?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

export function useAuth() {
  const router = useRouter();
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          setUser({
            id: parsed.id,
            name: parsed.full_name || parsed.email,
            email: parsed.email,
            avatar: parsed.avatar || "",
          });
        } catch (err) {
          console.error(err);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setInitializing(false);
    };

    fetchUser();
    window.addEventListener("auth-change", fetchUser);
    return () => window.removeEventListener("auth-change", fetchUser);
  }, []);

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

  const logout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("auth-change"));
    showAlert("Logged out successfully", "success");
    router.push("/login");
  };

  const register = async (
    email: string,
    password: string,
    fullName: string,
  ) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, full_name: fullName }),
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

  const updateProfile = async (
    data: Partial<User> & { password?: string; old_password?: string },
  ) => {
    if (!user) return;
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/profile/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: data.name,
            email: data.email,
            avatar: data.avatar,
            password: data.password,
            old_password: data.old_password,
          }),
        },
      );

      if (!response.ok) {
        const errorData: AuthResponse = await response.json();
        throw new Error(errorData.detail || "Update failed");
      }

      const updatedUser = await response.json();
      localStorage.setItem("user", JSON.stringify(updatedUser));
      window.dispatchEvent(new Event("auth-change"));
      showAlert("Profile updated successfully", "success");
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

  return { login, register, logout, updateProfile, user, loading, initializing };
}
