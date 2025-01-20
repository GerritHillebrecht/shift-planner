"use client";

import { Separator } from "@/components/ui/separator";
import { CalendarClientBlock } from "../components/block/client-block";
import { CalendarEmployeeBlock } from "../components/block/employee-block";
import { useCalendar } from "../provider";

export function CalendarEmployeeView() {
  const { currentDate, shifts, activeClient } = useCalendar();
  return (
    <>
      {activeClient && <CalendarClientBlock client={activeClient} />}
      <Separator className="mt-4" />
      {activeClient?.team.map((team) => (
        <div className="mt-3 grid gap-y-3" key={team.id}>
          {team.employees.map((employee) => (
              <CalendarEmployeeBlock
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
