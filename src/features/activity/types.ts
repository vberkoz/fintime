import { z } from "zod"

export type Event = {
  name: string;
  category: string;
  transactionDirection: string;
  transactionAmount: number;
  beginDate: string;
  endDate: string;
  notes: string;
}

export const ActivitySchema = z.object({
  activityCategory: z.string().min(1, 'Please select an option'),
  activityName: z.string().min(2, 'You must have a length of at least 2'),
  fundsDirection: z.string(),
  fundsAmount: z.string(),
  beginDate: z.string(),
  endDate: z.string(),
  activityNotes: z.string(),
})

export type Activity = z.infer<typeof ActivitySchema>;