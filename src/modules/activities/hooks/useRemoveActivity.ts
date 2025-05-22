import { useMutation, useQueryClient } from "@tanstack/react-query"
import { removeActivity } from "../services/activitiesService"
import { useAuth } from "react-oidc-context"

export const useRemoveActivity = () => {
  const queryClient = useQueryClient()
  const auth = useAuth();
  const accessToken = auth.user!.access_token;
  const cognitoUsername = auth.user!.profile["cognito:username"] as string
  
  return useMutation({
    mutationFn: (activityData: {
      endDate: string;
      activityId: string;
    }) => removeActivity(activityData, accessToken, cognitoUsername),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['activities'] })
    },
    onError(error) {
      // If we get a 404 with "No activities" message after deletion,
      // this means we deleted the last activity for that day
      if (error instanceof Error && 
        error.message === "No activities found for the given day") {
      // Just invalidate the query without refetching
      queryClient.setQueryData(['activities'], []);
    }
    },
  })
}