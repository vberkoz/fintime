import type { Activity } from "../types";

export const fetchActivities = async (): Promise<Activity[]> => {
  const response = [
    {
      activityCategory: "development",
      activityName: "Reviewed project requirements",
      fundsDirection: "outbound",
      fundsAmount: "0",
      beginDate: "2023-10-01T09:00:00.000Z",
      endDate: "2023-10-01T09:30:00.000Z",
      activityNotes: "Discussed project scope with team.",
    }
  ]

  return response
}