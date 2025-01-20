"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AddShift, deleteShift } from "@/lib/data/shifts";
import { cn } from "@/lib/utils";
import { Employee, ServiceRequirement, Shift } from "@/models";
import dayjs from "dayjs";
import { Info, Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCalendar } from "../provider";

interface CalendarDayEmployeeFieldProps {
  serviceRequirement: ServiceRequirement;
  employee: Employee;
  day: number;
}

export function CalendarDayEmployeeField({
  serviceRequirement,
  employee,
  day,
}: CalendarDayEmployeeFieldProps) {
  const { shifts, startDate, activeClient } = useCalendar();
  const [loading, setLoading] = useState(false);

  const currentDate = dayjs(startDate)
    .set("date", day)
    .set("hour", Number(serviceRequirement.start_time.split(":")[0]))
    .set("minute", Number(serviceRequirement.start_time.split(":")[1]));

  const startOfDay = currentDate.startOf("day");
  const endOfDay = currentDate.endOf("day");

  const date_in_shifts = shifts.some(
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

  async function handleClick(dateInShifts: boolean) {
    if (dateInShifts) {
      const shift = shifts.find(({ date, employee_id, requirement_id }) => {
        const dayjsDate = dayjs(date);

        return (
          employee_id === employee.id &&
          requirement_id === serviceRequirement.id &&
          dayjsDate > currentDate.startOf("day") &&
          dayjsDate < currentDate.endOf("day")
        );
      });

      if (!shift) {
        return;
      }

      return handleDeleteShift(shift);
    }

    const newShift: Omit<Shift, "id"> = {
      date: currentDate.toISOString(),
      employee_id: employee.id,
      requirement_id: serviceRequirement.id,
      client_id: activeClient!.id,
      start_time: serviceRequirement.start_time,
      end_time: serviceRequirement.end_time,
    };
    setLoading(true);
    await AddShift(newShift);
    setLoading(false);
  }

  async function handleDeleteShift(shift: Shift) {
    if (confirm("Are you sure you want to delete this shift?")) {
      setLoading(true);
      await deleteShift(shift.id);
      setLoading(false);
      toast.success(
        `${employee.firstname} wird nicht am ${dayjs(shift.date)
          .locale("de")
          .format("dddd, DD.MM")} im ${
          serviceRequirement.service_name
        } arbeiten.`
      );
    }
  }

  const active_day = serviceRequirement.days_of_week.includes(
    String((day - 1) % 7)
  );

  const requirement_fullfilled = shifts.find(
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

  const has_shift_in_day = shifts.find(({ date, employee_id }) => {
    const currentDate = dayjs(date);
    return (
      employee_id === employee.id &&
      currentDate > startOfDay &&
      currentDate < endOfDay
    );
  });

  return (
    <div
      onClick={() => handleClick(date_in_shifts)}
      className={cn(
        "absolute inset-0 flex items-center justify-center",
        active_day && !has_shift_in_day && "cursor-pointer",
        !active_day && "bg-muted"
      )}
    >
      {date_in_shifts && (
        <img
          className="h-4 w-4 dark:invert"
          src={serviceRequirement.icon}
          alt={serviceRequirement.service_name}
        />
      )}
      {loading && <Loader className="h-3 w-3 animate-spin" />}
      {(has_shift_in_day || requirement_fullfilled) &&
        active_day &&
        !date_in_shifts && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-3 w-3 opacity-20 print:hidden" />
              </TooltipTrigger>
              <TooltipContent>
                <ul>
                  {requirement_fullfilled && (
                    <li>
                      <span>Dieser Dienst ist bereits besetzt</span>
                    </li>
                  )}
                  {has_shift_in_day && (
                    <li>
                      <span>
                        Der Mitarbeiter wird an diesem Tag bereits bei{" "}
                        {has_shift_in_day.client?.firstname} eingesetzt
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
