import { ArrowRight, ChevronRight } from "lucide-react";
import { HoverBorderGradient } from "../ui/hover-border-gradient-btn";
import { Logo } from "../ui/logo";
import { Spotlight } from "../ui/spotlight";
import { AnimatedShinyText } from "../ui/animated-shiny-text";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="py-40 h-screen w-full flex md:items-center md:justify-center bg-black/[0.96] bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight />
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="relative z-20 p-4 max-w-7xl mx-auto w-full pt-20 md:pt-0">
        <Link href="/auth/login">
          <div
            className={cn(
              "group w-fit mx-auto mb-4 rounded-full border border-black/5 bg-neutral-100 text-sm text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            )}
          >
            <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
              <span>✨ Start your three month trial</span>
              <ArrowRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedShinyText>
          </div>
        </Link>
        <Logo
          className="text-center mx-auto"
          classNames="text-4xl md:text-7xl text-primary !font-black lg:!font-bold"
        />
        <h1 className="text-4xl relative z-20 md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          manage your shifts.
        </h1>
        <p className="relative z-20 mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
          A subtle yet effective spotlight effect, because the previous version
          is used a bit too much these days.
        </p>
        <div className="mt-6 flex justify-center text-center">
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
          >
            Get Started
            <ChevronRight size={16} className="ml-1" />
          </HoverBorderGradient>
        </div>
      </div>
    </section>
  );
}
