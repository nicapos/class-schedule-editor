import { useEffect, useState } from "react";
import Api from "../lib/api";
import { Schedule } from "../lib/types";
import { DaySchedule } from "react-schedule-view";
import { ClassEvent } from "../types/calendar";

/**
 * React Hook that gets the currently logged-in user's schedule data.
 */
const useSchedule = (userId: string | undefined) => {
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [daySchedule, setDaySchedule] = useState<DaySchedule<ClassEvent>[]>()
  
  useEffect(() => {
    async function fetchUserSchedule(userId: string) {
      setLoading(true);

      const userSchedules = await Api.getAllSchedules(userId);
      if (userSchedules.length === 0) {
        const userSchedule = await Api.createSchedule({ name: "My Schedule", userId });
        setSchedule(userSchedule);
      } else {
        setSchedule(userSchedules[0]);
      }
    }

    if (userId) {
      fetchUserSchedule(userId);
    }
  }, [userId]);

  async function fetchDaySchedule(scheduleId: string) {
    if (!scheduleId) return;

    const scheduleByDays = await Api.getSchedule(schedule?.id ?? '');
    setDaySchedule(scheduleByDays);

    setLoading(false);
  } 

  useEffect(() => {
    if (schedule) {
      fetchDaySchedule(schedule.id);
    }
  }, [schedule])

  function triggerRefresh() {
    if (schedule) {
      fetchDaySchedule(schedule.id);
    }
  }

  return { isLoading, schedule, daySchedule, setDaySchedule, triggerRefresh };
};

export default useSchedule;
