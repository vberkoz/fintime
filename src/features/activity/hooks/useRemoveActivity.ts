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
  })
}