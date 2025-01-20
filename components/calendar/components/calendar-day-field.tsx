import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function CalendarDayField({
  children,
  className,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "h-6 border-l border-t flex items-center justify-center relative",
        className
      )}
    >
      {children}
    </div>
  );
}
