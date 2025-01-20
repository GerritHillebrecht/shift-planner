import { Client, Employee, Shift } from "@/models";

import { PlannerDayHeadline } from "../headline/planner-day-headline";
import { PlannerClientDetails, PlannerRow } from "../row/planner-row";
import { PlannerRowServiceRequirement } from "../row/row-service-requirement";
import { PlannerRowElement } from "../row/planner-row-element";

export function PlannerEmployeeRow({
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
    <PlannerRowElement>
      <PlannerRow>
        <PlannerClientDetails
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
            <PlannerDayHeadline
              key={index}
              currentMonth={currentMonth}
              shifts={shifts}
              dayOfMonth={index + 1}
            />
          ))}
          {activeClient.serviceRequirements?.map((serviceRequirement, index) => (
            <PlannerRowServiceRequirement
              key={index}
              currentMonth={currentMonth}
              activeClient={activeClient}
              serviceRequirement={serviceRequirement}
              employee={employee}
            />
          ))}
        </div>
      </PlannerRow>
    </PlannerRowElement>
  );
}
