import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function CalendarToolbar({
  currentDate,
  setCurrentDate,
  setStartDate,
  setEndDate,
}: {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
}) {
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

  const handleMonthChange = (date: Date) => {
    setStartDate(new Date(date.getFullYear(), date.getMonth(), 1));
    setEndDate(new Date(date.getFullYear(), date.getMonth() + 1, 0));
    setCurrentDate(date);
  };

  return (
    <div className="flex justify-between items-center">
      <p>{formattedDate}</p>
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
          variant={"outline"}
          onClick={() =>
            handleMonthChange(
              new Date(currentDate.getFullYear(), currentDate.getMonth(), 0)
            )
          }
        >
          <ChevronLeft />
        </Button>
        <Button
          variant={"outline"}
          onClick={() =>
            handleMonthChange(
              new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
            )
          }
        >
          Today
        </Button>
        <Button
          variant={"outline"}
          onClick={() =>
            handleMonthChange(
              new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 0)
            )
          }
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
