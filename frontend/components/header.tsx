import Link from "next/link";
import { LoaderPinwheel } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import { TypographyMedium } from "./typography";
import { UserAuthButton } from "./user-auth-button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <LoaderPinwheel className="h-6 w-6 hover:animate-spin text-foreground" />
          </Link>
        </div>
        <nav className="hidden md:flex gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-foreground/90 hover:text-foreground/80 hover:bg-foreground/10 rounded-md px-3 py-2 transition-colors"
          >
            <TypographyMedium>Home</TypographyMedium>
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-foreground/90 hover:text-foreground/80 hover:bg-foreground/10 rounded-md px-3 py-2 transition-colors"
          >
            <TypographyMedium>About</TypographyMedium>
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-foreground/90 hover:text-foreground/80 hover:bg-foreground/10 rounded-md px-3 py-2 transition-colors"
          >
            <TypographyMedium>Services</TypographyMedium>
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-foreground/90 hover:text-foreground/80 hover:bg-foreground/10 rounded-md px-3 py-2 transition-colors"
          >
            <TypographyMedium>Contact</TypographyMedium>
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Separator orientation="vertical" className="h-6" />
          <UserAuthButton />
        </div>
      </div>
    </header>
  );
}
