import { User } from "../types";

const UserService = {
  getCurrentUser: async (): Promise<User> => {
    const response = await fetch("https://localhost:8080/api/user/me", {
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
    const response = await fetch("https://localhost:8080/api/user/all", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    });

    const { data } = await response.json();
    return data as User[];
  },
};

export default UserService;
