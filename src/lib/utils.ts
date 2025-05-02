import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLocalISOStringWithoutSeconds(date: string) {
  const now = new Date(date);
  const pad = (n: number) => String(n).padStart(2, '0');

  const year = now.getFullYear();
  const month = pad(now.getMonth() + 1);
  const day = pad(now.getDate());
  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

// Helper function to calculate duration between two dates
export const calculateDuration = (beginDate: string, endDate: string): string => {
  const start = new Date(beginDate);
  const end = new Date(endDate);
  const durationMs = end.getTime() - start.getTime();
  
  // Convert to minutes
  const minutes = Math.floor(durationMs / 60000);
  
  // Format as hours and minutes
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours > 0) {
    return `${hours}h ${remainingMinutes}m`;
  } else {
    return `${remainingMinutes}m`;
  }
};