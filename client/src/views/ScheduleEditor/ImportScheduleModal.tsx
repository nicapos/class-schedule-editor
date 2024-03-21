import React, { ChangeEvent, useEffect, useState } from "react";
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

interface ImportScheduleModalProps {
  handleImport: (file: File) => void;
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ImportScheduleModal({ handleImport, isOpen, setOpen }: ImportScheduleModalProps) {
  const [uploadedFile, setUploadedFile] = useState<File>();
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setUploadedFile(file);

      if (file.type === "application/json") {
        setUploadedFile(file);
        setErrorMsg("");
      } else {
        setUploadedFile(undefined);
        setErrorMsg("Please select a JSON file.");
      }
    }
  };

  useEffect(() => {
    // Clear uploaded file after every open
    if (isOpen) setUploadedFile(undefined); 
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Import Schedule</DialogTitle>
          <DialogDescription>
            Already have an exported schedule? Upload it here.
          </DialogDescription>
        </DialogHeader>

        <div className="grid w-full max-w-sm items-center gap-2 my-4">
          <Label htmlFor="picture">Schedule File (JSON)</Label>
          <Input
            id="picture"
            type="file"
            accept=".json"
            onChange={handleFileChange}
          />
          <p className="text-sm text-red-500 flex">{errorMsg}</p>
        </div>

        <DialogFooter className="md:justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              variant="default"
              onClick={() => uploadedFile && handleImport(uploadedFile)}
              disabled={!uploadedFile || errorMsg !== ""}
            >
              Upload
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
