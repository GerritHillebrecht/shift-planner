import { Client } from "@/models";
import { usePlanner } from "@/provider";
import { PlannerDayField } from "../planner-day-field";
import { PlannerRowHeadline } from "../headline/planner-row-headline";
import { PlannerRow } from "../row/planner-row";
import { PlannerRowElement } from "../row/planner-row-element";
import { PlannerRowDetails } from "../row/planner-row-details";
import { PlannerRowServiceRequirement } from "../row/planner-row-sc";

export function PlannerClientRow({ client }: { client: Client }) {
  const { daysInView } = usePlanner();

  return (
    <PlannerRowElement>
      <PlannerRow className="sticky top-0 z-10 bg-background">
        <PlannerRowDetails>{client.firstname}</PlannerRowDetails>
        <PlannerRowHeadline serviceRequirements={client.serviceRequirements} />
      </PlannerRow>
      {client.serviceRequirements?.map((serviceRequirement) => (
        <PlannerRowServiceRequirement
          key={serviceRequirement.id}
          serviceRequirement={serviceRequirement}
        >
          {Array.from({ length: daysInView }).map((_, index) => (
            <PlannerDayField key={index}>{index + 1}</PlannerDayField>
          ))}
        </PlannerRowServiceRequirement>
      ))}
    </PlannerRowElement>
  );
}
