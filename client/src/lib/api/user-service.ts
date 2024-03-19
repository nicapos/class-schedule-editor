import { User } from "../types";

const UserService = {
  getCurrentUser: async (): Promise<User> => {
    const response = await fetch("http://localhost:8080/api/user/me", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();
    return data as User;
  },
};

export default UserService;
