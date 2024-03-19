import { useEffect, useState } from "react";
import Api from "../lib/api";
import { Schedule } from "../lib/types";

/**
 * React Hook that gets the currently logged-in user's schedule data.
 */
const useSchedule = (userId: string | undefined) => {
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [isLoading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchUserSchedule(userId: string) {
      setLoading(true);

      const userSchedules = await Api.getAllSchedules(userId);
      if (userSchedules.length === 0) {
        const userSchedule = await Api.createSchedule({ name: "My Schedule", userId });
        setSchedule(userSchedule);
      }

      setLoading(false);
    }

    if (userId) {
      fetchUserSchedule(userId);
    }
  }, [userId]);

  return { isLoading, schedule };
};

export default useSchedule;
