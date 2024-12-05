"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { addDays, format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { useClearDatePicker } from "@/hooks/use-clear-date-picker";
import { useState } from "react";

type Props = {
  startDate: Date | undefined;
  endDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  setEndDate: (date: Date | undefined) => void;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;
export function DateFilter({
  className,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  ...props
}: Props) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: startDate,
    to: endDate ? addDays(endDate, 20) : undefined,
  });

  const clearDatePicker = useClearDatePicker({
    setDate,
    setStartDate,
    setEndDate,
  });

  return (
    <div {...props} className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-fit justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            showOutsideDays={false}
            fixedWeeks
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(newDate) => {
              if (newDate) {
                setDate(newDate);
                setStartDate(newDate.from);
                setEndDate(newDate.to);
              }
            }}
            numberOfMonths={2}
            footer={
              <div className="flex justify-end p-2">
                <span
                  className=" bg-muted-150 absolute bottom-[0.1rem] px-2 cursor-pointer text-muted-200 rounded left-[14rem] hover:bg-muted-150/80"
                  onClick={clearDatePicker}
                >
                  Reset
                </span>
              </div>
            }
            components={{
              NextMonthButton(props) {
                return (
                  <Button
                    variant="ghost"
                    className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
                    {...props}
                  >
                    <ChevronRightIcon />
                  </Button>
                );
              },

              PreviousMonthButton(props) {
                return (
                  <Button
                    variant="ghost"
                    className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
                    {...props}
                  >
                    <ChevronRightIcon style={{ transform: "rotate(180deg)" }} />
                  </Button>
                );
              },
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
