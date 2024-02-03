import { ClassEvent, ClassForm } from "../types/calendar";
import { DaySchedule } from "react-schedule-view";

export const mockSchedule: DaySchedule<ClassEvent>[] = [
  {
    name: "Mon",
    events: [
      {
        id: "mon-1",
        startTime: 12.75,
        endTime: 14.25,
        title: "MTH101A",
        description: "Online",
      },
      {
        id: "mon-2",
        startTime: 11,
        endTime: 12.5,
        title: "GEMATMW",
        description: "Online",
      },
    ],
  },
  {
    name: "Tue",
    events: [
      {
        id: "tue-1",
        startTime: 7.5,
        endTime: 9,
        title: "CCPROG1",
        description: "Online",
      },
      {
        id: "tue-2",
        startTime: 12.75,
        endTime: 14.25,
        title: "MTH101A",
        description: "Online",
      },
    ],
  },
  {
    name: "Wed",
    events: [],
  },
  {
    name: "Thu",
    events: [
      {
        id: "thu-1",
        startTime: 11,
        endTime: 12.5,
        title: "GEMATMW",
        description: "V321",
      },
      {
        id: "thu-2",
        startTime: 12.75,
        endTime: 14.25,
        title: "MTH101A",
        description: "V213",
      },
    ],
  },
  {
    name: "Fri",
    events: [
      {
        id: "fri-1",
        startTime: 7.5,
        endTime: 9,
        title: "CCPROG1",
        description: "G123",
      },
      {
        id: "fri-2",
        startTime: 12.75,
        endTime: 14.25,
        title: "MTH101A",
        description: "V213",
      },
    ],
  },
  {
    name: "Sat",
    events: [
      {
        id: "sat-1",
        startTime: 13,
        endTime: 15,
        title: "GEDANCE",
        description: "ER701",
      },
    ],
  },
];

export const mockClasses: ClassForm[] = [
  {
    id: "randomId1",
    startTime: "12:45",
    endTime: "14:15",
    name: "MTH101A",
    location: "Online",
    day: "Mon",
  },
  {
    id: "randomId2",
    startTime: "11:00",
    endTime: "12:30",
    name: "GEMATMW",
    location: "Online",
    day: "Mon",
  },
  {
    id: "randomId3",
    startTime: "07:30",
    endTime: "09:00",
    name: "CCPROG1",
    location: "Online",
    day: "Tue",
  },
  {
    id: "randomId4",
    startTime: "12:45",
    endTime: "14:15",
    name: "MTH101A",
    location: "Online",
    day: "Tue",
  },
  {
    id: "randomId5",
    startTime: "12:45",
    endTime: "14:15",
    name: "MTH101A",
    location: "V321",
    day: "Thu",
  },
  {
    id: "randomId6",
    startTime: "11:00",
    endTime: "12:30",
    name: "GEMATMW",
    location: "V213",
    day: "Thu",
  },
  {
    id: "randomId7",
    startTime: "07:30",
    endTime: "09:00",
    name: "CCPROG1",
    location: "G123",
    day: "Fri",
  },
  {
    id: "randomId8",
    startTime: "12:45",
    endTime: "14:15",
    name: "MTH101A",
    location: "V213",
    day: "Fri",
  },
  {
    id: "randomId9",
    startTime: "13:00",
    endTime: "15:00",
    name: "GEDANCE",
    location: "ER701",
    day: "Sat",
  },
];
