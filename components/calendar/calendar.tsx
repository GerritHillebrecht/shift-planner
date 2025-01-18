"use client";

import { Client } from "@/models/clients";
import { useEffect, useState } from "react";
import { CalendarContainer } from "./calendar-container";
import { EmployeeRow } from "./employee-row";
import { ClientRow } from "./client-row";
import { useShifts } from "@/hooks/use-supabase";
import { Button } from "../ui/button";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar as CalenderComponent } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { CalendarToolbar } from "./calendar-toolbar";

interface CalendarProps {
  activeClient: Client;
  className?: string;
}

export function Calendar({ activeClient, className }: CalendarProps) {
  const [startDate, setStartDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );

  const [endDate, setEndDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
  );

  const [currentDate, setCurrentDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
  );

  const { shifts, loading, error } = useShifts(startDate, endDate);

  console.log("shifts", shifts);

  return (
    <>
      {loading && (
        <Skeleton className="absolute top-0 inset-x-0 h-1 bg-red-400/40 z-50"></Skeleton>
      )}
      <CalendarContainer className={className}>
        <CalendarToolbar
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
        <ClientRow
          currentMonth={currentDate}
          activeClient={activeClient}
          shifts={shifts}
        />
        {activeClient.team?.[0]?.employees?.map((employee) => (
          <EmployeeRow
            activeClient={activeClient}
            employee={employee}
            currentMonth={currentDate}
            key={employee.id}
            shifts={shifts}
          />
        ))}
      </CalendarContainer>
    </>
  );
}
