import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createActivity } from "../services/activitiesService"
import { useAuth } from "react-oidc-context"

export const useCreateActivity = () => {
  const queryClient = useQueryClient()
  const auth = useAuth();
  const accessToken = auth.user!.access_token;
  const cognitoUsername = auth.user!.profile["cognito:username"] as string
  
  return useMutation({
    mutationFn: (activityData: {
      activityCategory: string;
      activityName: string;
      fundsDirection: string;
      fundsAmount: string;
      beginDate: string;
      endDate: string;
      activityNotes: string;
      activityId: string;
    }) => createActivity(activityData, accessToken, cognitoUsername),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['activities'] })
    },
  })
}