import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AlertProvider } from "@/context/alert-context";

export const metadata: Metadata = {
  title: "IT 112 App",
  description: "A modern web application built with Next.js and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AlertProvider>{children}</AlertProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
