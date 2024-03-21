import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
   * Gets the first two initials, given a name
   * @param name 
   * @returns string of 2 uppercase characters
   */
export function getNameInitials(name: string) {
  const words = name.trim().split(/\s+/);
  let initials = '';
  for (let i = 0; i < Math.min(2, words.length); i++) {
    initials += words[i][0].toUpperCase();
  }
  return initials;
}