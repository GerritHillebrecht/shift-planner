import { Client, Employee, Shift } from "@/models";

import { usePlanner } from "@/provider";
import { PlannerDayEmployeeField } from "../planner-day-employee-field";
import { PlannerDayField } from "../planner-day-field";
import { PlannerDayHeadline } from "../headline/planner-day-headline";
import { PlannerClientDetails, PlannerRow } from "../row/planner-row";
import { PlannerRowElement } from "../row/planner-row-element";
import { PlannerRowServiceRequirement } from "../row/planner-row-sc";

export function PlannerEmployeeBlock({
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
  const { daysInView } = usePlanner();
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
            gridTemplateColumns: `repeat(${daysInView}, 1fr)`,
          }}
        >
          {Array.from({ length: daysInView }).map((_, index) => (
            <PlannerDayHeadline
              key={index}
              currentMonth={currentMonth}
              shifts={shifts}
              dayOfMonth={index + 1}
            />
          ))}
        </div>
      </PlannerRow>
      {activeClient.serviceRequirements?.map((serviceRequirement) => {
        const numberOfShifts = shifts.filter(
          ({ requirement_id, employee_id }) =>
            requirement_id === serviceRequirement.id &&
            employee_id === employee.id
        ).length;

        return (
          <PlannerRowServiceRequirement
            key={serviceRequirement.id}
            serviceRequirement={serviceRequirement}
            numberOfShifts={numberOfShifts}
          >
            {Array.from({ length: daysInView }).map((_, index) => {
              return (
                <PlannerDayField key={index}>
                  <PlannerDayEmployeeField
                    day={index + 1}
                    serviceRequirement={serviceRequirement}
                    employee={employee}
                  />
                </PlannerDayField>
              );
            })}
          </PlannerRowServiceRequirement>
        );
      })}
    </PlannerRowElement>
  );
}
