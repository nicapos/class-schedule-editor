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
import { useEffect, useState } from "react";
import { validate } from "src/lib/validation";

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
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [userType, setUserType] = useState<UserType>('USER');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (isOpen && selectedUser) {
      setName(selectedUser.fullName);
      setEmail(selectedUser.email);
      setPassword('');
      setPhoneNumber(selectedUser.phoneNumber);
      setUserType(selectedUser.userType);
    }
  }, [isOpen, selectedUser]);

  function triggerFormSubmit(e: any) {
    e.preventDefault();

    if (!selectedUser) return;
    if (!name || !email || !phoneNumber || !userType) {
      setErrorMessage("Please fill in all required fields");
      return;
    }

    if (!validate("fullName", name)) {
      setErrorMessage("Please enter a valid name");
    } else if (!validate("phoneNumber", phoneNumber)) {
      setErrorMessage("Please enter a valid phone number");
    } else if (!validate("email", email)) {
      setErrorMessage("Please enter a valid email");
    } else if (password && !validate("password", password)) {
      setErrorMessage(
        "Password must contain at least 1 digit, 1 lowercase, 1 uppercase, 1 special character, and at least 8 characters long."
      );
    } else {
      setErrorMessage("");

      let updatedUser: User = {
        ...selectedUser,
        fullName: name,
        email,
        phoneNumber,
      };

      if (password) {
        updatedUser["password"] = password;
      }

      handleEdit(updatedUser);
    }
  }

  const renderForm = () => (
    <form
      method="POST"
      encType="multipart/form-data"
      className="flex flex-col w-full max-w-sm gap-5 py-4 mx-auto"
    >
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="fullName">Name</Label>
        <Input
          type="text"
          name="fullName"
          id="fullName"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="password">Password <span className="opacity-60">(optional)</span></Label>
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="grid max-w-sm items-center flex-0 w-48">
          <Label htmlFor="userType">User Type</Label>
          <Select value={userType} onValueChange={(option) => setUserType(option as UserType)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USER">
                User
              </SelectItem>
              <SelectItem value="ADMIN">
                Admin
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <p className="text-sm text-red-500 flex h-5 -mb-5">{errorMessage}</p>
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
          <Button type="button" onClick={triggerFormSubmit}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
