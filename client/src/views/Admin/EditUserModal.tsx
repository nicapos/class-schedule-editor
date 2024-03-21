import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "src/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "src/components/ui/select";
import { Button } from "src/components/ui/button";
import { Label } from "src/components/ui/label";
import { Input } from "src/components/ui/input";
import { User, UserType } from "src/lib/types";
import { useState } from "react";

interface EditUserModalProps {
  selectedUser?: User;
  handleEdit: (updatedUser: User) => void;
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditUserModal({
  selectedUser,
  handleEdit,
  isOpen,
  setOpen,
}: EditUserModalProps) {
  const [name, setName] = useState<string>(selectedUser?.fullName ?? '');
  const [email, setEmail]= useState<string>(selectedUser?.email ?? '');
  const [password, setPassword] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState<string>(selectedUser?.phoneNumber ?? '');
  const [userType, setUserType] = useState<UserType>(selectedUser?.userType ?? 'USER');

  const renderForm = () => (
    <form
      method="POST"
      encType="multipart/form-data"
      className="flex flex-col w-full max-w-sm gap-5 py-4 mx-auto"
    >
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="fullName">Name</Label>
        <Input type="text" name="fullName" id="fullName" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input type="email" name="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="********"
          value={password} onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="flex w-full max-w-sm gap-3">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            placeholder="Phone Number"
            value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="grid w-full max-w-sm items-center flex-0 w-48">
          <Label htmlFor="userType">User Type</Label>
          <Select value={userType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USER" onSelect={() => setUserType('USER')}>User</SelectItem>
              <SelectItem value="ADMIN" onSelect={() => setUserType('ADMIN')}>Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </form>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Update the details for any existing user.
          </DialogDescription>
        </DialogHeader>

        {renderForm()}

        <DialogFooter className="md:justify-end">
          <Button
            type="button"
            variant="secondary"
            // onClick={triggerFormSubmit}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
