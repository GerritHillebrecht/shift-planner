import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PlannerContainerProps {
  className?: string;
  children: ReactNode;
}

export function PlannerContainer({
  className,
  children,
}: PlannerContainerProps) {
  return (
    <div className={cn("grid gap-3 print:gap-1", className)}>{children} </div>
  );
}
