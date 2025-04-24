import { useQuery } from "@tanstack/react-query";
import { fetchActivities } from "../services/activityService";

export const useActivities = () => {
  return useQuery({ queryKey: ['activities'], queryFn: fetchActivities });
};