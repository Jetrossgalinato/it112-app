"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { TypographyH1, TypographyMuted } from "@/components/typography";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Header />
      <main className="flex-1 overflow-y-auto relative">
        {/* Background Blobs */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl opacity-50 mix-blend-multiply dark:mix-blend-normal animate-blob" />
          <div className="absolute top-[40%] right-[10%] w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-3xl opacity-50 mix-blend-multiply dark:mix-blend-normal animate-blob animation-delay-2000" />
          <div className="absolute -bottom-32 left-[20%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl opacity-50 mix-blend-multiply dark:mix-blend-normal animate-blob animation-delay-4000" />
        </div>

        <div className="flex min-h-full flex-col items-center justify-center">
          <section className="container max-w-7xl mx-auto w-full px-4 md:px-6 py-12">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col justify-center space-y-4"
              >
                <div className="space-y-2">
                  <TypographyH1>
                    Effortlessly Record and Manage Your{" "}
                    <span className="text-blue-600 dark:text-blue-400">
                      {" "}
                      Daily Logs{" "}
                    </span>
                  </TypographyH1>
                  <TypographyMuted>
                    This website empowers you to easily input your logs, keep
                    track of your activities, and stay organized.
                  </TypographyMuted>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href="/login">
                      <Button
                        size="lg"
                        className="shadow-lg shadow-blue-500/20"
                      >
                        Get Started
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                className="flex items-center justify-center relative"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-violet-500/10 rounded-full blur-2xl -z-10" />
                <Image
                  src="/logging.png"
                  alt="Hero"
                  width={550}
                  height={550}
                  className="overflow-hidden rounded-2xl object-contain object-center drop-shadow-2xl"
                  priority
                />
              </motion.div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
