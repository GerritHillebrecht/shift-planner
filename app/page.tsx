import { HeroSection } from "@/components/landing/section.hero";
import SplashCursor from "@/components/ui/splash-cursor";

export default async function Page() {
  return (
    <main>
      <HeroSection />
      <SplashCursor />
    </main>
  );
}
