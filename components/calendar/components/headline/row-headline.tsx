import { ServiceRequirement } from "@/models";
import { useCalendar } from "../../provider";
import { CalendarDayHeadline } from "./calendar-day-headline";

export function CalendarRowHeadline({
  serviceRequirements,
}: {
  serviceRequirements: ServiceRequirement[];
}) {
  const { daysInView, currentDate, shifts } = useCalendar();

  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${daysInView}, 1fr)`,
      }}
    >
      {Array.from({ length: daysInView }).map((_, index) => (
        <CalendarDayHeadline
          key={index}
          currentMonth={currentDate}
          shifts={shifts}
          serviceRequirements={serviceRequirements}
          dayOfMonth={index + 1}
        />
      ))}
    </div>
  );
}
