import { AddShift, deleteShift } from "@/lib/data/shifts";
import { cn } from "@/lib/utils";
import { Client } from "@/models/clients";
import { Employee } from "@/models/employees";
import { ServiceRequirement } from "@/models/service-requirements";
import { Shift } from "@/models/shift";
import dayjs from "dayjs";
import { Info } from "lucide-react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import "dayjs/locale/de"

export function RowServiceRequirement({
  currentMonth,
  employee,
  shifts,
  serviceRequirement,
  activeClient,
}: {
  currentMonth: Date;
  employee: Employee;
  shifts: Shift[];
  serviceRequirement: ServiceRequirement;
  activeClient: Client;
}) {
  async function handleClick(current_date: string, date_in_shifts: boolean) {
    if (date_in_shifts) {
      const shift = shifts.find(
        ({ date, employee_id, requirement_id }) =>
          employee_id === employee.id &&
          date === current_date &&
          requirement_id === serviceRequirement.id
      );

      if (!shift) {
        return;
      }

      return handleDeleteShift(shift);
    }

    const newShift: Omit<Shift, "id"> = {
      date: current_date,
      employee_id: employee.id,
      requirement_id: serviceRequirement.id,
      client_id: activeClient.id,
      start_time: "07:00",
      end_time: "19:00",
    };

    const addedShift = await AddShift(newShift);

    if (addedShift) {
      const name = `${employee.firstname} ${employee.lastname}`;
      const date = dayjs(current_date).locale("de").format("dddd, DD.MM");
      const service = serviceRequirement.service_name;
      const client = activeClient.firstname;

      toast.success(`${name} arbeitet am ${date} bei ${client} im ${service}`);
    }
  }

  function handleDeleteShift(shift: Shift) {
    if (confirm("Are you sure you want to delete this shift?")) {
      deleteShift(shift.id);
      toast.success(
        `${employee.firstname} wird nicht am ${dayjs(shift.date)
          .locale("de")
          .format("dddd, DD.MM")} im ${
          serviceRequirement.service_name
        } arbeiten.`
      );
    }
  }

  return Array.from({ length: currentMonth.getDate() }).map((_, index) => {
    const current_date = `${currentMonth.getFullYear()}-${String(
      currentMonth.getMonth() + 1
    ).padStart(2, "0")}-${String(index + 1).padStart(2, "0")}`;

    const date_in_shifts = shifts.some(
      ({ date, requirement_id, employee_id }) =>
        date === current_date &&
        requirement_id == serviceRequirement.id &&
        employee_id === employee.id
    );

    const active_day = serviceRequirement.days_of_week.includes(
      String(index % 7)
    );

    const requirement_fullfilled = shifts.find(
      ({ date, requirement_id, employee_id }) =>
        date === current_date &&
        requirement_id == serviceRequirement.id &&
        employee_id != employee.id
    );

    const has_shift_in_day = shifts.find(
      ({ date, employee_id }) =>
        employee_id === employee.id && date === current_date
    );

    return (
      <div
        key={index}
        onClick={() => handleClick(current_date, date_in_shifts)}
        className={cn(
          "h-6 border-l border-t flex items-center justify-center",
          active_day && !has_shift_in_day && "cursor-pointer",
          !active_day && "bg-muted",
        )}
      >
        {date_in_shifts && (
          <img
            className="h-4 w-4 dark:invert"
            src={serviceRequirement.icon}
            alt={serviceRequirement.service_name}
          />
        )}
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
                          Der Mitarbeiter wird an diesem Tag bereits eingesetzt
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
  });
}
