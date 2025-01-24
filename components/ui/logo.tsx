import { cn } from "@/lib/utils";
import { DM_Serif_Display } from "next/font/google";

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
});

export function Logo({ className, classNames }: { className?: string, classNames?: string }) {
  return (
    <h3 className={className}>
      <span
        className={cn(
          `font-bold opacity-90 text-3xl ${dmSerifDisplay.className}`,
          classNames
        )}
      >
        {process.env.NEXT_PUBLIC_APP_NAME}
      </span>
    </h3>
  );
}
