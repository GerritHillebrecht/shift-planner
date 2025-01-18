import { cn } from "@/lib/utils";
import { Employee } from "@/models/employees";
import { ServiceRequirement } from "@/models/service-requirements";
import { Shift } from "@/models/shift";
import { ReactNode } from "react";

interface CalendarClientProps {
  children: ReactNode;
  className?: string;
}

export function CalendarRow({ children }: CalendarClientProps) {
  return (
    <div className="grid grid-cols-[1fr,7fr] gap-2 w-full border rounded-sm print:rounded-none">
      {children}
    </div>
  );
}

export function CalendarClientDetails({
  className,
  employee,
  shifts,
  serviceRequirements,
}: {
  className?: string;
  employee: Employee;
  shifts: Shift[];
  serviceRequirements: ServiceRequirement[];
}) {
  return (
    <div className={cn("px-3 py-2", className)}>
      <p>
        {employee.firstname} {employee.lastname}
      </p>
      {serviceRequirements.map((serviceRequirement, index) => (
        <p className="text-xs opacity-75" key={index}>
          {serviceRequirement.service_name}:{" "}
          {
            shifts.filter(
              ({ requirement_id, employee_id }) =>
                employee_id === employee.id &&
                requirement_id === serviceRequirement.id
            ).length
          }
        </p>
      ))}
    </div>
  );
}
