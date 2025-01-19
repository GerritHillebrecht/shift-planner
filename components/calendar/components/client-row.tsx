import { Client, Shift } from "@/models";
import { CalendarDayHeadline } from "./calendar-day-headline";
import { CalendarRow } from "./calendar-row";
import { useCalendar } from "../provider";

export function ClientRow({
  currentMonth,
  shifts,
}: {
  currentMonth: Date;
  shifts: Shift[];
}) {
  const { activeClient } = useCalendar();

  return (
    <CalendarRow className="sticky top-0 z-10 bg-background">
      <span></span>
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${currentMonth.getDate()}, 1fr)`,
        }}
      >
        {activeClient &&
          Array.from({ length: currentMonth.getDate() }).map((_, index) => (
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
