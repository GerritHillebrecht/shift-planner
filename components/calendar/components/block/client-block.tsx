import { Client } from "@/models";
import { useCalendar } from "../../provider";
import { CalendarRow } from "../row/calendar-row";
import { CalendarRowElement } from "../row/calendar-row-element";
import { CalendarRowDetails } from "../row/row-details";
import { CalendarRowHeadline } from "../headline/row-headline";
import { CalendarDayField } from "../calendar-day-field";
import { CalendarRowSC } from "../row/row-sc";
import dayjs from "dayjs";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function CalendarClientBlock({ client }: { client: Client }) {
  const { daysInView, shifts } = useCalendar();

  return (
    <CalendarRowElement className="sticky top-0 z-10 bg-background">
      <CalendarRow>
        <CalendarRowDetails>{client.firstname}</CalendarRowDetails>
        <CalendarRowHeadline serviceRequirements={client.serviceRequirements} />
      </CalendarRow>
      {client.serviceRequirements.map((serviceRequirement) => (
        <CalendarRowSC
          key={serviceRequirement.id}
          serviceRequirement={serviceRequirement}
        >
          {Array.from({ length: daysInView }).map((_, index) => {
            const shift = shifts.find(
              ({ requirement_id, date: shiftDate }) =>
                requirement_id === serviceRequirement.id &&
                dayjs.utc(shiftDate).date() === index + 1
            );
            return (
              <CalendarDayField key={index}>
                {(shift?.employee && (
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
                            {JSON.stringify(dayjs(shift.date).date())} -
                            Shift Date: {JSON.stringify(shift.date)}
                          </code>
                        </pre>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </CalendarDayField>
            );
          })}
        </CalendarRowSC>
      ))}
    </CalendarRowElement>
  );
}
