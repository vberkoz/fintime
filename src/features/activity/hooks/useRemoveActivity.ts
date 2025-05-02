import { useMutation, useQueryClient } from "@tanstack/react-query"
import { removeActivity } from "../services/activityService"

export const useRemoveActivity = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: removeActivity,
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