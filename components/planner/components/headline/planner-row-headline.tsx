import { ServiceRequirement } from "@/models";
import { usePlanner } from "@/provider";
import { PlannerDayHeadline } from "./planner-day-headline";

export function PlannerRowHeadline({
  serviceRequirements,
}: {
  serviceRequirements?: ServiceRequirement[];
}) {
  const { daysInView, currentDate, shifts } = usePlanner();

  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${daysInView}, 1fr)`,
      }}
    >
      {Array.from({ length: daysInView }).map((_, index) => (
        <PlannerDayHeadline
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
