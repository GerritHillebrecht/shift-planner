import { Client, Employee, Shift } from "@/models";

import { CalendarDayHeadline } from "./calendar-day-headline";
import { CalendarClientDetails, CalendarRow } from "./calendar-row";
import { RowServiceRequirement } from "./row-service-requirement";

export function EmployeeRow({
  activeClient,
  employee,
  currentMonth,
  shifts,
}: {
  activeClient: Client;
  employee: Employee;
  currentMonth: Date;
  shifts: Shift[];
}) {
  return (
    <CalendarRow>
      <CalendarClientDetails
        shifts={shifts}
        serviceRequirements={activeClient.serviceRequirements}
        employee={employee}
      />

      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${currentMonth.getDate()}, 1fr)`,
        }}
      >
        {Array.from({ length: currentMonth.getDate() }).map((_, index) => (
          <CalendarDayHeadline
            key={index}
            currentMonth={currentMonth}
            shifts={shifts}
            dayOfMonth={index + 1}
          />
        ))}
        {activeClient.serviceRequirements.map((serviceRequirement, index) => (
          <RowServiceRequirement
            key={index}
            currentMonth={currentMonth}
            activeClient={activeClient}
            serviceRequirement={serviceRequirement}
            employee={employee}
            shifts={shifts}
          />
        ))}
      </div>
    </CalendarRow>
  );
}
