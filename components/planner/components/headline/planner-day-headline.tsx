import { cn } from "@/lib/utils";
import { ServiceRequirement } from "@/models/service-requirements";
import { Shift } from "@/models/shift";
import dayjs from "dayjs";

import "dayjs/locale/de";

interface PlannerDayHeadlineProps {
  currentMonth: Date;
  dayOfMonth: number;
  serviceRequirements?: ServiceRequirement[];
  shifts: Shift[];
}

export function PlannerDayHeadline({
  currentMonth,
  dayOfMonth,
  serviceRequirements,
  shifts,
}: PlannerDayHeadlineProps) {
  const date = dayjs(
    new Date(currentMonth.getFullYear(), currentMonth.getMonth(), dayOfMonth)
  );

  const startOfDay = date.startOf("day");
  const endOfDay = date.endOf("day");

  return (
    <div
      className={cn(
        "py-1 text-sm border-l flex items-center flex-col justify-center relative overflow-hidden"
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
              const dayjsDate = dayjs(shiftDate);

              return (
                requirement_id === serviceRequirement.id &&
                dayjsDate > startOfDay &&
                dayjsDate < endOfDay
              );
            }
          );

          return (
            <div
              key={index}
              className={cn(isFullfilled && "bg-primary/75")}
            ></div>
          );
        })}
      </div>
      <p className="opacity-80">{date.locale("de").format("DD")}</p>
      <p className="text-xs opacity-50">{date.locale("de").format("dd")}</p>
    </div>
  );
}
