export type UserType = "ADMIN" | "USER";

export interface User {
  id: string;
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  photoUrl?: string | null;
  userType: UserType;
}

export type EditableUser = Omit<User, "id" | "userType">;

export interface Schedule {
  id: string;
  name: string | null;
  userId: string;
}

export type EditableSchedule = Omit<Schedule, "id">;

export type Day = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat';

export interface ClassItem {
  id: number;
  className: string;
  day: Day;
  startTime: string;
  endTime: string;
  location: string;
  scheduleId: string;
};

export type EditableClassItem = Omit<ClassItem, "id">;

