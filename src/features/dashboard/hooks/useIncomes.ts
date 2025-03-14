import { useQuery } from "@tanstack/react-query";
import { fetchIncomes } from "../services/incomesService";

export const useIncomes = () => {
  return useQuery({ queryKey: ['incomes'], queryFn: fetchIncomes });
};