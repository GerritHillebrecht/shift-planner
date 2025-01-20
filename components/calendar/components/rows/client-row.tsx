import { Client } from "@/models";
import { useCalendar } from "../../provider";
import { CalendarRow } from "../row/calendar-row";
import { CalendarRowElement } from "../row/calendar-row-element";
import { CalendarRowDetails } from "../row/row-details";
import { CalendarRowHeadline } from "../headline/row-headline";
import { CalendarDayField } from "../calendar-day-field";
import { CalendarRowServiceRequirement } from "../row/row-sc";

export function ClientRow({ client }: { client: Client }) {
  const { daysInView } = useCalendar();

  return (
    <CalendarRowElement>
      <CalendarRow className="sticky top-0 z-10 bg-background">
        <CalendarRowDetails>{client.firstname}</CalendarRowDetails>
        <CalendarRowHeadline serviceRequirements={client.serviceRequirements} />
      </CalendarRow>
      {client.serviceRequirements.map((serviceRequirement) => (
        <CalendarRowServiceRequirement
          key={serviceRequirement.id}
          serviceRequirement={serviceRequirement}
        >
          {Array.from({ length: daysInView }).map((_, index) => (
            <CalendarDayField key={index}>{index + 1}</CalendarDayField>
          ))}
        </CalendarRowServiceRequirement>
      ))}
    </CalendarRowElement>
  );
}
