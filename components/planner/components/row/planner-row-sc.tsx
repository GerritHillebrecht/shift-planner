import { ServiceRequirement } from "@/models";
import { PlannerRow } from "./planner-row";
import { PlannerRowDetails } from "./planner-row-details";
import { usePlanner } from "@/provider";
import { Badge } from "@/components/ui/badge";

export function PlannerRowServiceRequirement({
  serviceRequirement,
  children,
  numberOfShifts,
  showBadge = true,
}: {
  serviceRequirement: ServiceRequirement;
  numberOfShifts?: number;
  children: React.ReactNode;
  showBadge?: boolean;
}) {
  const { daysInView } = usePlanner();
  return (
    <PlannerRow>
      <PlannerRowDetails>
        <div className="flex items-center justify-between w-full">
          <span className="text-xs opacity-75">
            {serviceRequirement.service_name}
          </span>
          {showBadge && (
            <Badge variant="outline" className="!py-0">
              <span className="text-[0.5rem]">{numberOfShifts}</span>
            </Badge>
          )}
        </div>
      </PlannerRowDetails>
      <div
        style={{ gridTemplateColumns: `repeat(${daysInView}, 1fr)` }}
        className="grid"
      >
        {children}
      </div>
    </PlannerRow>
  );
}
