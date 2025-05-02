import { useQuery } from "@tanstack/react-query";
import { fetchActivities } from "../services/activityService";

export const useActivities = (selectedDay?: string) => {
  return useQuery({
    queryKey: ['activities', selectedDay],
    queryFn: () => fetchActivities(selectedDay),
    // Don't retry on "No activities" message
    retry: (failureCount, error) => {
      // Check if the error is our expected "No activities" message
      if (error instanceof Error && 
          error.message === "No activities found for the given day") {
        return false; // Don't retry for this specific error
      }
      return failureCount < 3; // Default retry behavior for other errors
    },
    // Transform the error into an empty array for the "No activities" case
    staleTime: 5 * 60 * 1000, // 5 minutes - reduce refetching frequency
  });
}