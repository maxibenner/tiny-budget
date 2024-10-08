"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({
  onValueChange,
}: {
  onValueChange: (date: Date) => void;
}) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [isActive, setIsActive] = React.useState<boolean>(false);

  function handleDateChange(date: Date | undefined) {
    setDate(date);
    date && onValueChange(date);
    setIsActive(false);
  }

  React.useEffect(() => {
    date && onValueChange(date);
  }, []);

  return (
    <Popover onOpenChange={setIsActive} open={isActive} modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
