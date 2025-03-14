import { emulateLatency } from "../../../lib/emulateLatency";
import type { Expense } from "../types";

export const fetchExpenses = async (): Promise<Expense[]> => {
  const response = [
    { name: "Rent", value: 1200, category: "Expenses" },
    { name: "Groceries", value: 500, category: "Expenses" },
  ];

  await emulateLatency(2000);
  
  return response;
}