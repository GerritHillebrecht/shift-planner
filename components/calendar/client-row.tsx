import { Client, Shift } from "@/models";
import { CalendarDayHeadline } from "./calendar-day-headline";
import { CalendarRow } from "./calendar-row";

export function ClientRow({
  currentMonth,
  activeClient,
  shifts
}: {
  currentMonth: Date;
  activeClient: Client;
  shifts: Shift[];
}) {
  return (
    <CalendarRow>
      <span></span>
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
            serviceRequirements={activeClient.serviceRequirements}
            shifts={shifts}
            dayOfMonth={index + 1}
          />
        ))}
        {/* {activeClient.serviceRequirements.map((serviceRequirement, index) => (
          <CalendarServiceRequirementRow
            key={index}
            currentMonth={currentMonth}
            activeClient={activeClient}
            serviceRequirement={serviceRequirement}
            employee={employee}
            shifts={serviceRequirement.shifts}
          />
        ))} */}
      </div>
    </CalendarRow>
  );
}
