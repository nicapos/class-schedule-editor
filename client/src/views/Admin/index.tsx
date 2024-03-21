import React, { useState, useEffect } from "react";
import "src/assets/css/Admin.css";
import { Loader2 as Spinner } from "lucide-react";
import useCurrentUser from "src/hooks/useCurrentUser";
import Api from "src/lib/api";
import { Avatar, AvatarFallback, AvatarImage } from "src/components/ui/avatar";
import { Button } from "src/components/ui/button";
import { User } from "src/lib/types";
import EditUserModal from "./EditUserModal";
import { getNameInitials } from "src/lib/utils";

function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const { isLoading: isUserLoading } = useCurrentUser();

  useEffect(() => {
    async function fetchUsers() {
      const fetchedUsers = await Api.getAllUsers();
      setUsers(fetchedUsers);
      setIsLoading(false);
    }

    fetchUsers();
  }, []);

  function handleOpenEdit(user: User) {
    setSelectedUser(user);
    setEditModalOpen(true);
  }

  function handleEditUser(user: User) {}

  function renderRow(user: User) {
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
          <Button
            variant="secondary"
            className="mr-2"
            onClick={() => handleOpenEdit(user)}
          >
            Edit
          </Button>
          <Button variant="secondary">Delete</Button>
        </td>
      </tr>
    );
  }

  const renderPage = () => (
    <>
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
