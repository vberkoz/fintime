import { emulateLatency } from "../../../lib/emulateLatency";
import type { Incomes } from "../types";

export const fetchIncomes = async (): Promise<Incomes[]> => {
  const response = [
    { name: "Salary", value: 4000, category: "Income" },
    { name: "Freelance", value: 1000, category: "Income" },
  ];

  await emulateLatency(1500);
  
  return response;
}