import React from "react";
import { PlusIcon } from "@radix-ui/react-icons"
import { Button } from "src/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "src/components/ui/dialog";
import { Toggle } from "src/components/ui/toggle"
import { Label } from "src/components/ui/label";
import { Input } from "src/components/ui/input";
import { useRef, useState } from "react";
import { ClassItem } from "src/lib/types";
import { validate, validateTimeRange } from "src/lib/validation";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface AddClassModalProps {
  scheduleId?: string;
  handleAdd: (classItems: ClassItem[]) => void;
}

export default function AddClassModal({ scheduleId, handleAdd }: AddClassModalProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  function toggleDay(day: string) {
    if (selectedDays.includes(day)) {
      setSelectedDays((days) => days.filter((d) => d !== day));
    } else {
      setSelectedDays((days) => [...days, day]);
    }
  }

  function triggerFormSubmit(e: any) {
    e.preventDefault();

    if (!formRef.current || !scheduleId) return;

    const formData = new FormData(formRef.current);
    formData.append("scheduleId", scheduleId);
    const classItem = Object.fromEntries(formData.entries()) as Record<string, string>;
    
    // Validate form
    if (selectedDays.length === 0) {
      setErrorMessage("Please fill in all required fields.");
      return false;
    }

    const validations = [
      { field: "className", message: "Invalid class name. Use only alphanumeric characters, spaces, square brackets, hyphens, and quotes. Length should be 2 to 50 characters." },
      { field: "startTime", message: "Invalid time format for start time. Use HH:MM (00:00-23:59)." },
      { field: "endTime", message: "Invalid time format for end time. Use HH:MM (00:00-23:59)." },
      {
        field: "location",
        message:
          "Invalid location. Use only alphanumeric characters, space, square brackets, hyphens, and quotes. Length should be less than 50 characters.",
      },
    ];

    for (const validation of validations) {
      const fieldValue = formData.get(validation.field) as string;
      if (!fieldValue && validation.field !== "location") {
        setErrorMessage("Please fill in all required fields.");
        return false;
      }

      if (!validate(validation.field, fieldValue)) {
        setErrorMessage(validation.message);
        return false;
      }
    }

    if (!validateTimeRange(formData.get("startTime"), formData.get("endTime"))) {
      setErrorMessage("Invalid time range or time difference less than 15 minutes.")
      return false;
    }
    setErrorMessage('');
    
    // Create one instance of ClassItem for every selected day
    const classItems = selectedDays.map((day) => ({ ...classItem, day } as ClassItem));
    setSelectedDays([]);

    handleAdd(classItems);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="mr-auto">
          <PlusIcon className="h-4 w-4 mr-2" />Add Class
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Class</DialogTitle>
          <DialogDescription>
            Add a new class to your schedule.
          </DialogDescription>
        </DialogHeader>

        <form
          ref={formRef}
          method="POST"
          encType="multipart/form-data"
          className="flex flex-col w-full max-w-sm gap-5 pt-4 mx-auto"
        >
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="className">Class Name</Label>
            <Input
              type="text"
              name="className"
              id="className"
              placeholder="Class Name"
              required
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Day</Label>
            <div className="flex w-full gap-1.5">
              {DAYS.map(day => (
                <Toggle
                  variant="outline"
                  className="flex-1"
                  key={day}
                  onClick={() => toggleDay(day)}
                >
                  {day}
                </Toggle>
              ))}
            </div>
          </div>

          <div className="flex w-full max-w-sm gap-3">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                type="time"
                name="startTime"
                id="startTime"
                placeholder="Class Name"
                required
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="endTime">End Time</Label>
              <Input
                type="time"
                name="endTime"
                id="endTime"
                placeholder="Class Name"
                required
              />
            </div>
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="location">Location <span className="opacity-60">(optional)</span></Label>
            <Input
              type="text"
              name="location"
              id="location"
              placeholder="Location"
            />
          </div>

          <p className="text-sm text-red-500 flex h-5">{errorMessage}</p>
        </form>
        

        <DialogFooter className="md:justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              variant="default"
              onClick={triggerFormSubmit}
            >
              Add
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
