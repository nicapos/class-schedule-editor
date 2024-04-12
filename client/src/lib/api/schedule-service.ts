import { DaySchedule } from "react-schedule-view";
import { EditableSchedule, Schedule } from "../types";
import { ClassEvent } from "@/src/types/calendar";

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
  getSchedule: async (id: string): Promise<DaySchedule<ClassEvent>[]> => {
    const response = await fetch(`${baseURL}/schedule/${id}/?includeClasses=true`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();
    return data as DaySchedule<ClassEvent>[];
  }
};

export default ScheduleService;