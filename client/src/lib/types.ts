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
