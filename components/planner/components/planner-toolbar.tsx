import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { usePlanner } from "@/provider";
import dayjs, { Dayjs, ManipulateType } from "dayjs";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export function PlannerToolbar({ className }: { className?: string }) {
  const { lang } = useParams();

  const { startDate, setCurrentDate, setStartDate, setEndDate, selectedView } =
    usePlanner();
  const [formattedDate, setFormattedDate] = useState(
    startDate.toLocaleString(lang, {
      month: "long",
    })
  );

  useEffect(() => {
    setFormattedDate(
      startDate.toLocaleString(lang, {
        month: "long",
      })
    );
  }, [startDate]);

  const handleMonthChange = (date: Dayjs) => {
    setStartDate(date.startOf("month").toDate());
    setEndDate(date.endOf("month").toDate());
    setCurrentDate(date.toDate());
  };

  return (
    <div className={cn("flex justify-between items-center", className)}>
      <div>
        <p className="text-5xl font-black">{formattedDate}</p>
        <p className="block text-base leading-none tracking-[-0.5px] font-light uppercase opacity-50">
          {startDate.getFullYear()}
        </p>
      </div>
      <div className="flex space-x-1 print:hidden">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "justify-start text-left font-normal px-3",
                !startDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={(date) => {
                if (!date) return;
                setStartDate(dayjs(date).startOf("month").toDate());
                setEndDate(dayjs(date).endOf("month").toDate());
                setCurrentDate(date);
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
