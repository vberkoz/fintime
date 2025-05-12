import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createActivity } from "../services/activitiesService"

export const useCreateActivity = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: createActivity,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['activities'] })
    },
  })
}