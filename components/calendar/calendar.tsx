"use client";

import { ReactNode } from "react";
import { Skeleton } from "../ui/skeleton";
import { CalendarContainer } from "./components/calendar-container";
import { CalendarToolbar } from "./components/calendar-toolbar";
import { useCalendar } from "./provider";

interface CalendarProps {
  className?: string;
  children?: ReactNode;
  view?: "month" | "week";
  perspective?: "employee" | "client";
}

export function Calendar({
  className,
  children,
}: // perspective = "client",
// view = "month",
CalendarProps) {
  const { loading } = useCalendar();

  return (
    <>
      {loading && (
        <Skeleton className="absolute top-0 inset-x-0 h-1 bg-red-400/40 z-50"></Skeleton>
      )}
      <CalendarContainer className={className}>
        <CalendarToolbar />
        {children}
        {/* {selectedPerspective === "employee" && (
          <CalendarEmployeeView
            activeClient={activeClient}
            currentDate={currentDate}
            shifts={shifts}
          />
        )} */}
      </CalendarContainer>
    </>
  );
}
