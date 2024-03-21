import { User } from "../types";

const baseURL = "https://localhost:8080/api";

const UserService = {
  getCurrentUser: async (): Promise<User> => {
    const response = await fetch(`${baseURL}/user/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();
    return data.user as User;
  },
  getAllUsers: async (): Promise<User[]> => {
    const response = await fetch(`${baseURL}/user/all`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    });

    const { data } = await response.json();
    return data as User[];
  },
  updateUser: async (id: string, user: User): Promise<boolean> => {
    const response = await fetch(`${baseURL}/user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user),
      credentials: "include",
    });

    if (response.ok) {
      return true;
    } else {
      const { error } = await response.json();
      throw new Error(error || "Failed to update user");
    }
  },
  deleteUser: async (id: string): Promise<boolean> => {
    const response = await fetch(`${baseURL}/user/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    });

    if (response.ok) {
      return true;
    } else {
        const { error } = await response.json();
        throw new Error(error || "Failed to delete user");
    }
  },
};

export default UserService;
