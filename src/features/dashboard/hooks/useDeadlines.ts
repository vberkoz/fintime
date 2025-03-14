import { useQuery } from "@tanstack/react-query";
import { fetchDeadlines } from "../services/deadlinesService";

export const useDeadlines = () => {
  return useQuery({ queryKey: ['deadlines'], queryFn: fetchDeadlines });
};