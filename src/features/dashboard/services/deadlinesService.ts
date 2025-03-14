import { emulateLatency } from "../../../lib/emulateLatency";
import type { Deadline } from "../types";

export const fetchDeadlines = async (): Promise<Deadline[]> => {
  const response = [
    { date: "10/20/2023", description: "Pay Rent", status: "Pending" },
    { date: "10/25/2023", description: "Submit Report", status: "In Progress" },
  ];

  await emulateLatency(3500);
  
  return response;
}