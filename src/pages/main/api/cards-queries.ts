// apps/dapp/src/entities/user/model/user-queries.ts
import { useMutation, useQuery, useQueryClient } from "react-query";
import { fetchCards, deleteCard, createCard } from "./cards-requests";

import { CardType } from "./types";

export const useCards = (limit = 10, skip = 0) => {
  return useQuery<CardType[], Error>(["cards", limit, skip], () =>
    fetchCards(limit, skip)
  );
};

export const useDeleteCard = () => {
  const queryClient = useQueryClient();
  return useMutation<CardType, Error, { id: string }>(
    ({ id }) => deleteCard(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["cards"]);
      },
    }
  );
};

export const useCreateCard = () => {
  const queryClient = useQueryClient();
  return useMutation<CardType, Error>(() => createCard(), {
    onSuccess: () => {
      queryClient.invalidateQueries(["cards"]);
    },
  });
};
