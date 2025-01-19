"use client";

import { ClientRow } from "../components/client-row";
import { EmployeeRow } from "../components/employee-row";
import { useCalendar } from "../provider";

export function CalendarEmployeeView() {
  const { currentDate, shifts, activeClient } = useCalendar();
  return (
    <>
      <ClientRow
        currentMonth={currentDate}
        shifts={shifts}
      />
      {activeClient?.team.map((team) => (
        <div className="mt-3 grid gap-y-3" key={team.id}>
          {team.employees
            ?.sort((a, b) => {
              if (a.firstname < b.firstname) {
                return -1;
              }
              if (a.firstname > b.firstname) {
                return 1;
              }
              return 0;
            })
            .map((employee) => (
              <EmployeeRow
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
