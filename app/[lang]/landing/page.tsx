"use client";

import { AnimatedBeamMultipleOutputDemo } from "@/components/landing/section-animated-beam";
import { FeatureSection } from "@/components/landing/section-feature";
import { HeroSection } from "@/components/landing/section.hero";
import { Button } from "@/components/ui/button";
import SplashCursor from "@/components/ui/splash-cursor";
import { ModeToggle } from "@/components/ui/theme-selector";

export default function Page() {
  return (
    <div className="bg-black relative">
      <SplashCursor />
      <header className="flex items-center sticky h-10 sm:h-12 -mb:10 sm:-mb-12 bg-white/90 dark:bg-black/80 backdrop-blur backdrop-saturate-150 mx-auto px-8 w-fit top-3 rounded-full border z-50">
        <nav className="flex items-center gap-x-2">
          <Button variant="ghost">Header</Button>
          <Button variant="ghost">Product</Button>
          <Button variant="ghost">Feature</Button>
          <Button variant="ghost">Plans</Button>
          <ModeToggle />
        </nav>
      </header>
      <div className="relative">
        <HeroSection />
        {/* <Separator /> */}
        <AnimatedBeamMultipleOutputDemo />
      </div>
      {/* <Separator /> */}
      <FeatureSection />
    </div>
  );
}
