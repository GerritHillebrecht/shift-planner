import { cn } from "@/lib/utils";
import { DM_Serif_Display } from "next/font/google";

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
});

export function Logo({ className }: { className?: string }) {
  return (
    <h3 className="">
      <span
        className={cn(
          `font-bold opacity-90 text-3xl ${dmSerifDisplay.className}`,
          className
        )}
      >
        {process.env.APP_NAME}
      </span>
    </h3>
  );
}
