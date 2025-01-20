import { ServiceRequirement } from "@/models";
import { CalendarRow } from "./calendar-row";
import { CalendarRowDetails } from "./row-details";
import { useCalendar } from "../../provider";

export function CalendarRowSC({
  serviceRequirement,
  children,
}: {
  serviceRequirement: ServiceRequirement;
  children: React.ReactNode;
}) {
  const { daysInView } = useCalendar();
  return (
    <CalendarRow>
      <CalendarRowDetails>
        <span className="text-xs opacity-75">
          {serviceRequirement.service_name}
        </span>
      </CalendarRowDetails>
      <div
        style={{ gridTemplateColumns: `repeat(${daysInView}, 1fr)` }}
        className="grid"
      >
        {children}
      </div>
    </CalendarRow>
  );
}
