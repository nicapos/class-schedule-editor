import { EditableSchedule, Schedule } from "../types";

const baseURL = "http://localhost:8080/api";

const ScheduleService = {
  getAllSchedules: async (userId: string): Promise<Schedule[]> => {
    const response = await fetch(`${baseURL}/schedule/?userId=${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();
    return data as Schedule[];
  },
  createSchedule: async ({
    name,
    userId,
  }: EditableSchedule): Promise<Schedule> => {
    const response = await fetch(`${baseURL}/schedule/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ name: name ?? "", userId }),
      credentials: "include",
    });

    const data = await response.json();
    return data as Schedule;
  },
};

export default ScheduleService;