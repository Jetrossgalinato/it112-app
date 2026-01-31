import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { TypographyH1, TypographyMuted } from "@/components/typography";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center max-w-7xl mx-auto w-full">
        <section className="container px-4 md:px-6 py-12">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <TypographyH1>
                  Effortlessly Record and Manage Your{" "}
                  <span className="text-destructive"> Daily Logs </span>
                </TypographyH1>
                <TypographyMuted>
                  This website empowers you to easily input your logs, keep
                  track of your activities, and stay organized.
                </TypographyMuted>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg">Get Started</Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/logging.png"
                alt="Hero"
                width={600}
                height={600}
                className="overflow-hidden rounded-2xl object-contain object-center"
                priority
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
