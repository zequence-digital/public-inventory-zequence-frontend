"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Calendar } from "@/components/ui/calendar";

type Props = {
  date?: Date;
  setDate: (date: Date | undefined) => void;
};

export function CalenderFilter({ date, setDate }: Props) {
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <div className="cursor-pointer">
            <picture>
              <img src="/images/date-picker.svg" alt=" calender filter" />
            </picture>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="date">
            <Calendar
              selectedDayBg="bg-primary-100"
              selected={date}
              onSelect={(date) => setDate(date)}
              mode="single"
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
