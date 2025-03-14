import { emulateLatency } from "../../../lib/emulateLatency";
import type { Activity } from "../types";

export const fetchActivities = async (): Promise<Activity[]> => {
  const response = [
    { date: "10/15/2023", amount: 1000, category: "Freelance" },
    { date: "10/14/2023", amount: -50, category: "Groceries" },
    { date: "10/13/2023", amount: 4000, category: "Salary" },
    { date: "10/12/2023", amount: -100, category: "Entertainment" },
  ];

  await emulateLatency(3000);
  
  return response;
}