"use client";

import { Separator } from "@/components/ui/separator";
import { PlannerClientBlock } from "../components/block/planner-client-block";
import { PlannerEmployeeBlock } from "../components/block/planner-employee-block";
import { usePlanner } from "@/provider";

export function PlannerEmployeeView() {
  const { currentDate, shifts, activeClient } = usePlanner();
  return (
    <>
      {activeClient && <PlannerClientBlock client={activeClient} />}
      <Separator className="mt-4" />
      {activeClient?.team?.map((team) => (
        <div className="mt-3 grid gap-y-3" key={team.id}>
          {team.employees?.map((employee) => (
              <PlannerEmployeeBlock
                activeClient={activeClient}
                employee={employee}
                currentMonth={currentDate}
                key={employee.id}
                shifts={shifts}
              />
            ))}
        </div>
      ))}
    </>
  );
}
