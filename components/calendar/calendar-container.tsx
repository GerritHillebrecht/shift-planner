import { cn } from "@/lib/utils";
import { Client } from "@/models/clients";
import { ReactNode } from "react";

interface CalendarContainerProps {
  className?: string;
  children: ReactNode;
}

export function CalendarContainer({
  className,
  children,
}: CalendarContainerProps) {
  return <div className={cn("grid gap-3 print:gap-1", className)}>{children} </div>;
}
