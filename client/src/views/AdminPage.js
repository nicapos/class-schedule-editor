import React, { useState, useEffect } from "react";
import "../assets/css/Admin.css";
import { Loader2 as Spinner } from "lucide-react";
import useCurrentUser from "../hooks/useCurrentUser";
import Api from "../lib/api";
import { Avatar, AvatarFallback, AvatarImage } from "src/components/ui/avatar";
import { Button } from "src/components/ui/button";

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedPassword, setEditedPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { isLoading: isUserLoading } = useCurrentUser();

  useEffect(() => {
    async function fetchUsers() {
      const fetchedUsers = await Api.getAllUsers();
      setUsers(fetchedUsers);

      setIsLoading(false);
    }

    fetchUsers();
  }, []);

  // const handleEditUser = (userId, currentPassword) => {
  //   setEditingUserId(userId);
  //   setEditedPassword(currentPassword); // set the current password in the state
  // };

  // const handleSaveEdit = (userId, updatedUserData) => {
  //   fetch(`https://localhost:8080/admin/users/${userId}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(updatedUserData),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // Update local state
  //       setUsers(users.map((user) => (user.id === userId ? data : user)));
  //       setEditingUserId(null);
  //       setEditedPassword(""); // reset the edited password after saving
  //     })
  //     .catch((error) => console.error("Error updating user data:", error));
  // };

  function renderRow(user) {
    const { id, fullName, email, password, phoneNumber, photoUrl, userType } =
      user;

    return (
      <tr key={user.id}>
        <td>{fullName}</td>
        <td>{email}</td>
        <td>********</td>
        <td>{phoneNumber}</td>
        <td>
          <Avatar>
            <AvatarImage src={photoUrl} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </td>
        <td>{userType}</td>
        <td>
          <Button variant="secondary" className="mr-2">
            Edit
          </Button>
          <Button variant="secondary">Delete</Button>
        </td>
      </tr>
    );
  }

  const renderPage = () => (
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
        <tbody>{!isLoading && users.map((user) => renderRow(user))}</tbody>
      </table>
    </div>
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
