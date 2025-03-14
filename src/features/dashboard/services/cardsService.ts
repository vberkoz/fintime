import { emulateLatency } from "../../../lib/emulateLatency";
import type { Card } from "../types";

export const fetchCards = async (): Promise<Card[]> => {
  const response = [
    { title: "Income", valueCaption1: "Total", value1: "$5,000", valueCaption2: "Goal", value2: "$6,000" },
    { title: "Expenses", valueCaption1: "Total", value1: "$3,000", valueCaption2: "Remaining", value2: "$1,000" },
    { title: "Time Usage", valueCaption1: "Work", value1: "40h", valueCaption2: "Leisure", value2: "10h" },
    { title: "Net Worth", valueCaption1: "Savings", value1: "$2,000", valueCaption2: "from last month", value2: "+6%" },
  ];

  await emulateLatency(1000);
  
  return response;
}