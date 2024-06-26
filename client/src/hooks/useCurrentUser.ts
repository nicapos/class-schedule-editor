import { useEffect, useState } from "react";
import Api from "../lib/api";
import { useNavigate } from "react-router";
import { User } from "../lib/types";

/**
 * React Hook that gets the currently logged-in user using session data.
 * Redirects user to /login if no session data found.
 */
const useCurrentUser = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = await Api.getCurrentUser();
        if (!currentUser) {
          // No logged in user. Redirect back to login
          navigate("/login");
          return;
        }
        setUser(currentUser);
      } catch (error) {
        console.error("Error fetching current user:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  return { isLoading, user };
};

export default useCurrentUser;
