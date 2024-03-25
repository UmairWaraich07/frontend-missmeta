import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTimeAgo(createdAt: string): string {
  const now = new Date();
  const uploadedAt = new Date(createdAt);
  const timeDifference = now.getTime() - uploadedAt.getTime();

  // Convert milliseconds to seconds
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return days === 1 ? "1d ago" : `${days}d ago`;
  } else if (hours > 0) {
    return hours === 1 ? "1h ago" : `${hours}h ago`;
  } else if (minutes > 0) {
    return minutes === 1 ? "1m ago" : `${minutes}m ago`;
  } else {
    return "just now";
  }
}
