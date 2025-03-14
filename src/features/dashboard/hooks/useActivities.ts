import { useQuery } from "@tanstack/react-query";
import { fetchActivities } from "../services/activitiesService";

export const useActivities = () => {
  return useQuery({ queryKey: ['activities'], queryFn: fetchActivities });
};