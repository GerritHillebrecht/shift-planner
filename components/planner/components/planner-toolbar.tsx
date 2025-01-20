import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { usePlanner } from "@/provider";
import dayjs, { Dayjs, ManipulateType } from "dayjs";

export function PlannerToolbar() {
  const {
    startDate,
    currentDate,
    setCurrentDate,
    setStartDate,
    setEndDate,
    selectedView,
  } = usePlanner();
  const [formattedDate, setFormattedDate] = useState(
    currentDate.toLocaleString("de-DE", {
      month: "long",
      year: "numeric",
    })
  );

  useEffect(() => {
    setFormattedDate(
      currentDate.toLocaleString("de-DE", {
        month: "long",
        year: "numeric",
      })
    );
  }, [currentDate]);

  const handleMonthChange = (date: Dayjs) => {
    setStartDate(date.startOf("month").toDate());
    setEndDate(date.endOf("month").toDate());
    setCurrentDate(date.toDate());
  };

  return (
    <div className="flex justify-between items-center">
      <p className="text-2xl">{formattedDate}</p>
      <div className="flex space-x-1 print:hidden">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "justify-start text-left font-normal px-3",
                !currentDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={currentDate}
              onSelect={(date) => {
                setCurrentDate(
                  date
                    ? new Date(date.getFullYear(), date.getMonth() + 1, 0)
                    : currentDate
                );
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Button
          variant="outline"
          onClick={() =>
            handleMonthChange(
              dayjs(startDate).subtract(1, selectedView as ManipulateType)
            )
          }
        >
          <ChevronLeft />
        </Button>
        <Button variant={"outline"} onClick={() => handleMonthChange(dayjs())}>
          Heute
        </Button>
        <Button
          variant={"outline"}
          onClick={() =>
            handleMonthChange(
              dayjs(startDate).add(1, selectedView as ManipulateType)
            )
          }
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
