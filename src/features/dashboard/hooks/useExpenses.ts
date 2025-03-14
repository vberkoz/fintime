import { useQuery } from "@tanstack/react-query";
import { fetchExpenses } from "../services/expensesService";

export const useExpenses = () => {
  return useQuery({ queryKey: ['expenses'], queryFn: fetchExpenses });
};