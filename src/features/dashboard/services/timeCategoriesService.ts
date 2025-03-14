import { emulateLatency } from "../../../lib/emulateLatency";
import type { TimeCategory } from "../types";

export const fetchTimeCategories = async (): Promise<TimeCategory[]> => {
  const response = [
    { name: "Work", value: 40, color: "#8884d8" },
    { name: "Study", value: 10, color: "#82ca9d" },
    { name: "Leisure", value: 10, color: "#ffc658" },
  ];

  await emulateLatency(2500);
  
  return response;
}