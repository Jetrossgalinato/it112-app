"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AvatarDropdown } from "./avatar-dropdown";

export function UserAuthButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = () => {
      const user = localStorage.getItem("user");
      setIsLoggedIn(!!user);
    };

    checkLogin();
    window.addEventListener("auth-change", checkLogin);
    return () => window.removeEventListener("auth-change", checkLogin);
  }, []);

  if (isLoggedIn) {
    return <AvatarDropdown />;
  }

  return (
    <Link href="/login">
      <Button size="sm">Get Started</Button>
    </Link>
  );
}
