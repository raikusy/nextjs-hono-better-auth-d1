import { type ClassValue, clsx } from "clsx";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";

export function formatDate(dateString: string): string {
  const date = dayjs(dateString);
  return date.format("DD MMM, YYYY hh:mm A");
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
