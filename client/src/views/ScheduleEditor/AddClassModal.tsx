import React from "react";
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
import { Label } from "src/components/ui/label";
import { Input } from "src/components/ui/input";
import { toast } from "sonner";
import { useRef, useState } from "react";
import Api from "src/lib/api";
import { ClassItem } from "src/lib/types";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function AddClassModal({ scheduleId }: { scheduleId?: string }) {
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
    
    selectedDays.forEach((day) => {
      formData.append("day", day);

      const classItem = Object.fromEntries(formData.entries()) as unknown as ClassItem;

      toast.promise(Api.createClass(classItem), {
        loading: 'Loading...',
        success: (data: ClassItem) => {
          // Reset selected days
          setSelectedDays([]);

          return `'${data.className}' (${data.day}) has been added`
        },
        error: `Error in adding class '${classItem.className}' (${day})`,
      });

      console.log(classItem);
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Add Class</Button>
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
                <Button
                  type="button"
                  variant={selectedDays.includes(day) ? "default" : "outline"}
                  onClick={() => toggleDay(day)}
                  key={day}
                  className="flex-1"
                >
                  {day}
                </Button>
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
