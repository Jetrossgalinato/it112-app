import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <section className="container px-4 md:px-6 py-12">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Effortlessly Record and Manage Your Daily Logs
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  This website empowers you to easily input your logs, keep track of your activities, and stay organized.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg">Get Started</Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/globe.svg"
                alt="Hero"
                width={500}
                height={500}
                className="aspect-square overflow-hidden rounded-xl object-contain object-center dark:invert"
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