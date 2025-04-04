import type { Event } from "../types";

export const fetchEvents = async (): Promise<Event[]> => {
  const response = [
    {
      "name": "Reviewed project requirements",
      "category": "Work",
      "transactionDirection": "expense",
      "transactionAmount": 0,
      "beginDate": "2023-10-01T09:00:00.000Z",
      "endDate": "2023-10-01T09:30:00.000Z",
      "notes": "Discussed project scope with team.",
    },
    {
      "name": "Wrote code for new feature",
      "category": "Work",
      "transactionDirection": "income",
      "transactionAmount": 50, // Hourly rate or equivalent value
      "beginDate": "2023-10-01T10:00:00.000Z",
      "endDate": "2023-10-01T12:00:00.000Z",
      "notes": "Implemented user authentication flow.",
    },
    {
      "name": "Lunch break",
      "category": "Leisure",
      "transactionDirection": "expense",
      "transactionAmount": 15,
      "beginDate": "2023-10-01T12:30:00.000Z",
      "endDate": "2023-10-01T13:00:00.000Z",
      "notes": "Had a quick sandwich at the local deli.",
    },
    {
      "name": "Debugged application errors",
      "category": "Work",
      "transactionDirection": "income",
      "transactionAmount": 30, // Equivalent value for debugging effort
      "beginDate": "2023-10-01T14:00:00.000Z",
      "endDate": "2023-10-01T15:00:00.000Z",
      "notes": "Resolved issues related to API integration.",
    },
    {
      "name": "Attended team meeting",
      "category": "Work",
      "transactionDirection": "expense",
      "transactionAmount": 0,
      "beginDate": "2023-10-01T15:30:00.000Z",
      "endDate": "2023-10-01T16:00:00.000Z",
      "notes": "Discussed sprint progress and upcoming tasks.",
    },
    {
      "name": "Planned weekend off-roading trip",
      "category": "Hobby",
      "transactionDirection": "expense",
      "transactionAmount": 0,
      "beginDate": "2023-10-01T17:00:00.000Z",
      "endDate": "2023-10-01T17:30:00.000Z",
      "notes": "Checked trail maps and packed gear.",
    },
    {
      "name": "Paid for off-road park entrance fee",
      "category": "Hobby",
      "transactionDirection": "expense",
      "transactionAmount": 25,
      "beginDate": "2023-10-01T18:00:00.000Z",
      "endDate": "2023-10-01T18:05:00.000Z",
      "notes": "Purchased weekend pass online.",
    },
    {
      "name": "Watched YouTube tutorials on web development",
      "category": "Learning",
      "transactionDirection": "expense",
      "transactionAmount": 0,
      "beginDate": "2023-10-01T19:00:00.000Z",
      "endDate": "2023-10-01T20:00:00.000Z",
      "notes": "Learned about React state management.",
    },
    {
      "name": "Off-roading practice session",
      "category": "Hobby",
      "transactionDirection": "expense",
      "transactionAmount": 0,
      "beginDate": "2023-10-01T20:30:00.000Z",
      "endDate": "2023-10-01T22:00:00.000Z",
      "notes": "Tested vehicle on rocky terrain.",
    },
    {
      "name": "Dinner with friends",
      "category": "Social",
      "transactionDirection": "expense",
      "transactionAmount": 40,
      "beginDate": "2023-10-01T22:30:00.000Z",
      "endDate": "2023-10-01T23:30:00.000Z",
      "notes": "Celebrated friend's birthday at a restaurant.",
    }
  ];

  return response;
}