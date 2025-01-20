import { cn } from "@/lib/utils";
import { ServiceRequirement } from "@/models";
import { Employee } from "@/models/employees";
import { Shift } from "@/models/shift";
import { ReactNode } from "react";

interface CalendarClientProps {
  children: ReactNode;
  className?: string;
}

export function PlannerRow({ children, className }: CalendarClientProps) {
  return (
    <div className={cn("grid grid-cols-[1fr,7fr] gap-2 w-full", className)}>
      {children}
    </div>
  );
}

export function PlannerClientDetails({
  className,
  employee,
  shifts,
  serviceRequirements,
}: {
  className?: string;
  employee: Employee;
  shifts: Shift[];
  serviceRequirements?: ServiceRequirement[];
}) {
  return (
    <div className={cn("px-2 py-2", className)}>
      <p>
        {employee.firstname} {employee.lastname}
      </p>
    </div>
  );
}
