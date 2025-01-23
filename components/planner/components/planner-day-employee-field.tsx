"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Employee, ServiceRequirement } from "@/models";
import { usePlanner } from "@/provider";
import dayjs from "dayjs";
import { CalendarIcon, Info, Loader } from "lucide-react";
import { useState } from "react";
import { handleAddShift, handleDeleteActiveShift } from "../utils/handlers";
import { PlannerShiftSheet } from "./planner-shift-sheet";

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

  const isDateInShifts = shifts.find(
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
    String((day - 2) % 7)
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
      className={cn(
        "absolute inset-0 flex items-center justify-center",
        isActiveDay &&
          !isRequirementFullfilled &&
          !isShiftInDay &&
          "cursor-pointer",
        !isActiveDay && "bg-muted"
      )}
    >
      {!isDateInShifts && (
        <div
          className="absolute inset-0"
          onClick={() =>
            handleAddShift({
              isDateInShifts,
              currentDate,
              employee,
              serviceRequirement,
              activeClient,
              setLoading,
              shifts,
            })
          }
        ></div>
      )}
      {isDateInShifts && (
        <Sheet>
          <SheetTrigger asChild>
            <div>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <img
                    className="h-4 w-4 dark:invert"
                    src={serviceRequirement.icon || ""}
                    alt={serviceRequirement.service_name}
                  />
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="flex justify-between space-x-4">
                    <Avatar>
                      <AvatarImage />
                      <AvatarFallback>
                        {isDateInShifts.employee?.firstname[0]}
                        {isDateInShifts.employee?.lastname?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1 min-w-full">
                      <h4 className="text-sm font-semibold">
                        {isDateInShifts.employee?.firstname}{" "}
                        {isDateInShifts.employee?.lastname}
                      </h4>
                      <p className="text-sm">
                        {serviceRequirement.service_name} bei{" "}
                        {activeClient?.firstname} {activeClient?.lastname}
                        {/* The React Framework – created and maintained by @vercel. */}
                      </p>
                      <div className="flex items-center pt-2">
                        <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                        <span className="text-xs text-muted-foreground">
                          {dayjs(isDateInShifts.date).format("DD.MM.YYYY")}{" "}
                          {isDateInShifts.start_time} -{" "}
                          {isDateInShifts.end_time}
                        </span>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </SheetTrigger>
          <SheetContent className="w-full sm:w-3/4 max-w-full sm:max-w-sm">
            <SheetHeader>
              <SheetTitle>Edit Shift</SheetTitle>
              <SheetDescription>
                Make changes to the Shift of{" "}
                {isDateInShifts.employee?.firstname}
              </SheetDescription>
            </SheetHeader>
            <form>
              <PlannerShiftSheet shift={isDateInShifts} />
              <SheetFooter>
                <SheetClose asChild>
                  <div className="grid grid-cols-2 gap-x-2 w-full items-center">
                    <Button
                      onClick={() =>
                        handleDeleteActiveShift(isDateInShifts.id, setLoading)
                      }
                      variant="outline"
                      color="warn"
                    >
                      Delete Shift
                    </Button>
                    <Button type="submit">Save changes</Button>
                  </div>
                </SheetClose>
              </SheetFooter>
            </form>
          </SheetContent>
        </Sheet>
      )}
      {loading && <Loader className="h-3 w-3 animate-spin" />}
      {(isShiftInDay || isRequirementFullfilled) &&
        isActiveDay &&
        !isDateInShifts && (
          <HoverCard>
            <HoverCardTrigger asChild>
              <Info className="h-3 w-3 opacity-20 print:hidden" />
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex justify-between space-x-4">
                <Avatar>
                  <AvatarImage />
                  <AvatarFallback>
                    {isShiftInDay?.employee?.firstname[0]}
                    {isShiftInDay?.employee?.lastname?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">
                    Für diese Schicht kann für {employee.firstname} kein Dienst
                    vergeben werden
                  </h4>
                  <ol className="list-disc list-inside">
                    {isRequirementFullfilled && (
                      <li>
                        <span className="text-xs">
                          {serviceRequirement.service_name} ist bereits besetzt
                        </span>
                      </li>
                    )}
                    {isShiftInDay && (
                      <li>
                        <span className="text-xs">
                          {employee.firstname} wird an diesem Tag bereits bei{" "}
                          {isShiftInDay.client?.firstname} eingesetzt
                        </span>
                      </li>
                    )}
                  </ol>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        )}
    </div>
  );
}
