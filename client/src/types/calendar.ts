import { CalendarEvent } from "react-schedule-view";

export type ClassEvent = {
  id: string;
} & CalendarEvent;

export type TimeFormat = `${"0" | ""}${number | "1"}:${string}`;

export type Day = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";

export type ClassForm = {
  id: string;
  name: string;
  day: Day;
  startTime: TimeFormat;
  endTime: TimeFormat;
  location: string;
};
