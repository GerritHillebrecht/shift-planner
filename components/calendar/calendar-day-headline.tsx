import { cn } from "@/lib/utils";
import { ServiceRequirement } from "@/models/service-requirements";
import { Shift } from "@/models/shift";
import dayjs from "dayjs";

import "dayjs/locale/de";

interface CalendarDayHeadlineProps {
  currentMonth: Date;
  dayOfMonth: number;
  serviceRequirements?: ServiceRequirement[];
  shifts: Shift[];
}

export function CalendarDayHeadline({
  currentMonth,
  dayOfMonth,
  serviceRequirements,
  shifts,
}: CalendarDayHeadlineProps) {
  const date = dayjs(
    new Date(currentMonth.getFullYear(), currentMonth.getMonth(), dayOfMonth)
  );

  return (
    <div
      className={cn(
        "py-1 text-sm border-l flex items-center flex-col justify-center relative"
      )}
    >
      <div
        className="absolute inset-0 grid"
        style={{
          gridTemplateColumns: `repeat(${
            serviceRequirements?.length ?? 0
          }, 1fr)`,
        }}
      >
        {serviceRequirements?.map((serviceRequirement, index) => {
          const isFullfilled = shifts.some(
            ({ date: shiftDate, requirement_id }) => {
              return (
                shiftDate === date.format("YYYY-MM-DD") &&
                requirement_id === serviceRequirement.id
              );
            }
          );

          return (
            <div
              key={index}
              className={cn(isFullfilled && "bg-lime-400/75")}
            ></div>
          );
        })}
      </div>
      <p className="opacity-80">{date.locale("de").format("DD")}</p>
      <p className="text-xs opacity-50">{date.locale("de").format("dd")}</p>
    </div>
  );
}
