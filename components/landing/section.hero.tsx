import { ChevronRight } from "lucide-react";
import { HoverBorderGradient } from "../ui/hover-border-gradient-btn";
import { Logo } from "../ui/logo";
import { Spotlight } from "../ui/spotlight";

export function HeroSection() {
  return (
    <section className="py-40 w-full flex md:items-center md:justify-center bg-black/[0.96] bg-grid-white/[0.02] relative overflow-hidden">
      {/* <SplashCursor /> */}
      <Spotlight />
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="relative z-20 p-4 max-w-7xl mx-auto w-full pt-20 md:pt-0">
        {/* <GradientText
            colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
            animationSpeed={7}
            showBorder={false}
            className={cn(
              "text-7xl !font-black -mb-2",
              dmSerifDisplay.className
            )}
          >
            VitalSync
          </GradientText> */}
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
