import React, { useEffect, useState } from "react";
import { Button } from "src/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "src/components/ui/dialog";
import { Label } from "src/components/ui/label";
import { Input } from "src/components/ui/input";
import { Loader2 as Spinner } from "lucide-react";
import { ClassItem, Day, EditableClassItem } from "src/lib/types";
import Api from "src/lib/api";

interface EditClassModalProps {
  scheduleId?: string;
  classId?: string;
  handleEdit: (id: string, classItem: EditableClassItem) => void;
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditClassModal({
  scheduleId,
  classId,
  handleEdit,
  isOpen,
  setOpen,
}: EditClassModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  
  const [name, setName] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [day, setDay] = useState<Day>();
  const [location, setLocation] = useState<string>("");

  function triggerFormSubmit(e: any) {
    e.preventDefault();
    console.log('submitting form...')
    if (!scheduleId || !classId || !day) return;

    const editedClassItem: EditableClassItem = {
      className: name,
      startTime,
      endTime,
      day,
      location,
      scheduleId
    };

    // TODO: Validate form

    handleEdit(classId, editedClassItem);
  }

  useEffect(() => {
    const fetchClassDetails = async (id: string) => {
      setIsLoading(true);
      const classItem: ClassItem = await Api.getClass(id);
      console.log(classItem);

      // Set form data to current class details
      setName(classItem.className);
      setStartTime(classItem.startTime);
      setEndTime(classItem.endTime);
      setDay(classItem.day);
      setLocation(classItem.location);

      setIsLoading(false);
    }

    if (isOpen && classId) {
      fetchClassDetails(classId);
    }
    console.log('triggered', isOpen, classId)
  }, [isOpen, classId]);

  const renderForm = () => (
    <form
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="flex w-full max-w-sm gap-3">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="startTime">Start Time</Label>
          <Input
            type="time"
            name="startTime"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="endTime">End Time</Label>
          <Input
            type="time"
            name="endTime"
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
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
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
    </form>
  )

  const renderLoading = () => (
    <div className="flex flex-col items-center justify-center gap-2 my-4">
      <Spinner className="h-28 w-28 animate-spin opacity-80" />
      <p>Loading class info...</p>
    </div>
  )

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Class</DialogTitle>
          <DialogDescription>
            Update the details for a single instance of an existing class.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? renderLoading() : renderForm()}

        <DialogFooter className="md:justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              onClick={triggerFormSubmit}
            >
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
