import { Client, Employee, Shift } from "@/models";

import { CalendarDayHeadline } from "../headline/calendar-day-headline";
import { CalendarClientDetails, CalendarRow } from "../row/calendar-row";
import { CalendarRowElement } from "../row/calendar-row-element";
import { RowServiceRequirement } from "../row/row-service-requirement";
import { CalendarRowSC } from "../row/row-sc";
import { useCalendar } from "../../provider";
import { CalendarDayField } from "../calendar-day-field";
import { CalendarDayEmployeeField } from "../calendar-day-employee-field";

export function CalendarEmployeeBlock({
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
  const { daysInView } = useCalendar();
  return (
    <CalendarRowElement>
      <CalendarRow>
        <CalendarClientDetails
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
            <CalendarDayHeadline
              key={index}
              currentMonth={currentMonth}
              shifts={shifts}
              dayOfMonth={index + 1}
            />
          ))}
          {activeClient.serviceRequirements.map((serviceRequirement, index) => (
            <RowServiceRequirement
              key={index}
              currentMonth={currentMonth}
              activeClient={activeClient}
              serviceRequirement={serviceRequirement}
              employee={employee}
            />
          ))}
        </div>
      </CalendarRow>
      {activeClient.serviceRequirements.map((serviceRequirement) => (
        <CalendarRowSC
          key={serviceRequirement.id}
          serviceRequirement={serviceRequirement}
        >
          {Array.from({ length: daysInView }).map((_, index) => {
            return (
              <CalendarDayField key={index}>
                <CalendarDayEmployeeField
                  day={index + 1}
                  serviceRequirement={serviceRequirement}
                  employee={employee}
                />
              </CalendarDayField>
            );
          })}
        </CalendarRowSC>
      ))}
    </CalendarRowElement>
  );
}
