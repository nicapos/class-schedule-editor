import React, { useState, useEffect } from "react";
import "../assets/css/Admin.css";
import { Loader2 as Spinner } from "lucide-react";
import useCurrentUser from "../hooks/useCurrentUser";

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedPassword, setEditedPassword] = useState("");
  const { isLoading, user } = useCurrentUser();

  useEffect(() => {
    fetch("https://localhost:8080/admin/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  const handleEditUser = (userId, currentPassword) => {
    setEditingUserId(userId);
    setEditedPassword(currentPassword); // set the current password in the state
  };

  const handleSaveEdit = (userId, updatedUserData) => {
    fetch(`https://localhost:8080/admin/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUserData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update local state
        setUsers(users.map((user) => (user.id === userId ? data : user)));
        setEditingUserId(null);
        setEditedPassword(""); // reset the edited password after saving
      })
      .catch((error) => console.error("Error updating user data:", error));
  };

  const renderPage = () => (
    <div className="container" id="admin-page">
      <h1>Admin Panel</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) => setEditedPassword(e.target.value)}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    value={user.email}
                    onChange={(e) => setEditedPassword(e.target.value)}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    value={user.phone}
                    onChange={(e) => setEditedPassword(e.target.value)}
                  />
                ) : (
                  user.phone
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="password"
                    value={editedPassword}
                    onChange={(e) => setEditedPassword(e.target.value)}
                  />
                ) : (
                  "********"
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <button
                    onClick={() =>
                      handleSaveEdit(user.id, {
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        password: editedPassword,
                      })
                    }
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditUser(user.id, user.password)}
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
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
