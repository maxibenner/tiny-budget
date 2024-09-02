"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import MonthCalendar from "./month-calendar";

export function MonthPicker({
  onValueChange,
  className,
}: {
  onValueChange: (date: Date) => void;
  className?: string;
}) {
  const [popupOpen, setPopupOpen] = React.useState(false);
  const [currentDate, setCurrentDate] = React.useState<Date>(new Date());

  function handleDateChange(date: Date) {
    setCurrentDate(date);
    setPopupOpen(false);

    onValueChange(date);
  }

  return (
    <div className={className}>
      <Popover open={popupOpen} onOpenChange={setPopupOpen} modal={true}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full sm:w-[280px] justify-start text-left font-normal",
              !currentDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {currentDate ? (
              format(currentDate, "MMMM yyy")
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <MonthCalendar
            currentMonth={currentDate}
            onMonthChange={handleDateChange}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
