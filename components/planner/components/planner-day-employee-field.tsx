"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Employee, ServiceRequirement } from "@/models";
import dayjs from "dayjs";
import { Info, Loader } from "lucide-react";
import { useState } from "react";
import { usePlanner } from "@/provider";
import { handleDateClick } from "../utils/handlers";

interface PlannerDayEmployeeFieldProps {
  serviceRequirement: ServiceRequirement;
  employee: Employee;
  day: number;
}

export function PlannerDayEmployeeField({
  serviceRequirement,
  employee,
  day,
}: PlannerDayEmployeeFieldProps) {
  const { shifts, startDate, activeClient } = usePlanner();
  const [loading, setLoading] = useState(false);

  const currentDate = dayjs(startDate)
    .set("date", day)
    .set("hour", Number(serviceRequirement.start_time.split(":")[0]))
    .set("minute", Number(serviceRequirement.start_time.split(":")[1]));

  const startOfDay = currentDate.startOf("day");
  const endOfDay = currentDate.endOf("day");

  const isDateInShifts = shifts.some(
    ({ date, requirement_id, employee_id }) => {
      const shiftDate = dayjs(date);
      return (
        shiftDate > startOfDay &&
        shiftDate < endOfDay &&
        requirement_id == serviceRequirement.id &&
        employee_id === employee.id
      );
    }
  );

  const isActiveDay = serviceRequirement.days_of_week.includes(
    String((day - 1) % 7)
  );

  const isRequirementFullfilled = shifts.find(
    ({ date, requirement_id, employee_id }) => {
      const currentDate = dayjs(date);
      return (
        requirement_id == serviceRequirement.id &&
        employee_id != employee.id &&
        currentDate > startOfDay &&
        currentDate < endOfDay
      );
    }
  );

  const isShiftInDay = shifts.find(({ date, employee_id }) => {
    const currentDate = dayjs(date);
    return (
      employee_id === employee.id &&
      currentDate > startOfDay &&
      currentDate < endOfDay
    );
  });

  return (
    <div
      onClick={() =>
        handleDateClick({
          isDateInShifts,
          currentDate,
          employee,
          serviceRequirement,
          activeClient,
          setLoading,
          shifts,
        })
      }
      className={cn(
        "absolute inset-0 flex items-center justify-center",
        isActiveDay &&
          !isRequirementFullfilled &&
          !isShiftInDay &&
          "cursor-pointer",
        !isActiveDay && "bg-muted"
      )}
    >
      {isDateInShifts && (
        <img
          className="h-4 w-4 dark:invert"
          src={serviceRequirement.icon || ""}
          alt={serviceRequirement.service_name}
        />
      )}
      {loading && <Loader className="h-3 w-3 animate-spin" />}
      {(isShiftInDay || isRequirementFullfilled) &&
        isActiveDay &&
        !isDateInShifts && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-3 w-3 opacity-20 print:hidden" />
              </TooltipTrigger>
              <TooltipContent>
                <ul>
                  {isRequirementFullfilled && (
                    <li>
                      <span>Dieser Dienst ist bereits besetzt</span>
                    </li>
                  )}
                  {isShiftInDay && (
                    <li>
                      <span>
                        {employee.firstname} wird an diesem Tag bereits bei{" "}
                        {isShiftInDay.client?.firstname} eingesetzt
                      </span>
                    </li>
                  )}
                </ul>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
    </div>
  );
}
