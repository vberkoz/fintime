import { useQuery } from "@tanstack/react-query";
import { fetchCards } from "../services/cardsService";

export const useCards = () => {
  return useQuery({ queryKey: ['cards'], queryFn: fetchCards });
};