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

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface AddClassModalProps {
  scheduleId?: string;
  handleAdd: (classItems: ClassItem[]) => void;
}

export default function AddClassModal({ scheduleId, handleAdd }: AddClassModalProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

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

    // TODO: Validate form

    // Create one instance of ClassItem for every selected day
    const classItems = selectedDays.map((day) => {
      formData.append("day", day);

      const classItem = Object.fromEntries(formData.entries()) as unknown;
      return classItem as ClassItem;
    });

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
          className="flex flex-col w-full max-w-sm gap-5 py-4 mx-auto"
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
            <Label htmlFor="location">Location</Label>
            <Input
              type="text"
              name="location"
              id="location"
              placeholder="Location"
            />
          </div>
        </form>

        <DialogFooter className="md:justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
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
