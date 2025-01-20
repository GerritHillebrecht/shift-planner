import { Client } from "@/models";
import { usePlanner } from "@/provider";
import { PlannerRow } from "../row/planner-row";
import { PlannerRowElement } from "../row/planner-row-element";
import { PlannerRowDetails } from "../row/planner-row-details";
import { PlannerRowHeadline } from "../headline/planner-row-headline";
import { PlannerDayField } from "../planner-day-field";
import { PlannerRowServiceRequirement } from "../row/planner-row-sc";
import dayjs from "dayjs";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function PlannerClientBlock({ client }: { client: Client }) {
  const { daysInView, shifts } = usePlanner();

  return (
    <PlannerRowElement className="sticky top-0 z-10 bg-background">
      <PlannerRow>
        <PlannerRowDetails>{client.firstname}</PlannerRowDetails>
        <PlannerRowHeadline serviceRequirements={client.serviceRequirements} />
      </PlannerRow>
      {client.serviceRequirements?.map((serviceRequirement) => (
        <PlannerRowServiceRequirement
          key={serviceRequirement.id}
          serviceRequirement={serviceRequirement}
          showBadge={false}
        >
          {Array.from({ length: daysInView }).map((_, index) => {
            const shift = shifts.find(
              ({ requirement_id, date: shiftDate }) =>
                requirement_id === serviceRequirement.id &&
                dayjs.utc(shiftDate).date() === index + 1
            );
            return (
              <PlannerDayField key={index}>
                {shift?.employee && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <p className="text-[0.5rem] whitespace-nowrap">
                          {shift.employee.firstname[0]}{" "}
                          {shift.employee.lastname?.[0]}
                        </p>
                      </TooltipTrigger>
                      <TooltipContent>
                        <pre>
                          <code>
                            Index: {JSON.stringify(index)} - Dayjs Date:{" "}
                            {JSON.stringify(dayjs(shift.date).date())} - Shift
                            Date: {JSON.stringify(shift.date)}
                          </code>
                        </pre>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </PlannerDayField>
            );
          })}
        </PlannerRowServiceRequirement>
      ))}
    </PlannerRowElement>
  );
}
