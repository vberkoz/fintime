import { useQuery } from "@tanstack/react-query";
import { fetchTimeCategories } from "../services/timeCategoriesService";

export const useTimeCategories = () => {
  return useQuery({ queryKey: ['timeCategories'], queryFn: fetchTimeCategories });
};