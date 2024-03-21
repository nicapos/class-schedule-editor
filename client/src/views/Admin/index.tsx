import React, { useState, useEffect } from "react";
import "src/assets/css/Admin.css";
import { Loader2 as Spinner } from "lucide-react";
import { Toaster } from "src/components/ui/sonner";
import { Avatar, AvatarFallback, AvatarImage } from "src/components/ui/avatar";
import { Button } from "src/components/ui/button";
import EditUserModal from "./EditUserModal";
import { toast } from "sonner";

import useCurrentUser from "src/hooks/useCurrentUser";
import Api from "src/lib/api";
import { User } from "src/lib/types";
import { getNameInitials } from "src/lib/utils";

function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const { isLoading: isUserLoading } = useCurrentUser();

  async function fetchUsers() {
    const fetchedUsers = await Api.getAllUsers();
    setUsers(fetchedUsers);
  }

  useEffect(() => {
    setIsLoading(true);
    fetchUsers().then(() => setIsLoading(false));
  }, []);

  function handleEditUser(user: User) {
    toast.promise(Api.updateUser(user.id, user), {
      loading: "Loading...",
      success: () => {
        fetchUsers();
        setEditModalOpen(false);
        return `Updated user '${user.fullName}'`;
      },
      error: `Error in updating instance of '${user.fullName}'`,
    });
  }

  function renderRow(user: User) {
    function handleOpenEdit() {
      setSelectedUser(user);
      setEditModalOpen(true);
    }

    return (
      <tr key={user.id}>
        <td>{user.fullName}</td>
        <td>{user.email}</td>
        <td>********</td>
        <td>{user.phoneNumber}</td>
        <td>
          <Avatar>
            <AvatarImage src={user.photoUrl ?? ""} />
            <AvatarFallback>{getNameInitials(user.fullName)}</AvatarFallback>
          </Avatar>
        </td>
        <td>{user.userType}</td>
        <td>
          <Button variant="secondary" className="mr-2" onClick={handleOpenEdit}>
            Edit
          </Button>
          <Button variant="secondary">Delete</Button>
        </td>
      </tr>
    );
  }

  const renderPage = () => (
    <>
      <Toaster richColors expand />

      <EditUserModal
        selectedUser={selectedUser}
        handleEdit={handleEditUser}
        isOpen={isEditModalOpen}
        setOpen={setEditModalOpen}
      />

      <div className="container" id="admin-page">
        <h1>Admin Panel</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Phone Number</th>
              <th>Avatar</th>
              <th>User Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {!isUserLoading &&
              !isLoading &&
              users.map((user) => renderRow(user))}
          </tbody>
        </table>
      </div>
    </>
  );

  const renderLoading = () => (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-4">
      <Spinner className="h-32 w-32 animate-spin" />
      <p>Loading app...</p>
    </div>
  );

  return isLoading ? renderLoading() : renderPage();
}

export default AdminPage;
