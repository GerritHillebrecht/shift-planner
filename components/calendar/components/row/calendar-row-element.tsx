import { cn } from "@/lib/utils";

export function CalendarRowElement({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("border rounded-sm print:rounded-none", className)}>
      {children}
    </div>
  );
}
