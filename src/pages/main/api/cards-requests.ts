// apps/dapp/src/entities/user/model/user-requests.ts
import axios from "axios";
import { ApiError } from "shared/lib/api-error";
import api from "shared/lib/api";
import { CardType } from "./types";

export const fetchCards = async (limit = 10, skip = 0): Promise<CardType[]> => {
  try {
    const response = await api.get<CardType[]>("/card", {
      params: { limit, skip },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new ApiError(
        error.response?.status || 500,
        "Network response was not ok",
        error.response?.data
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const deleteCard = async (id: string): Promise<CardType> => {
  try {
    const response = await api.delete<CardType>(`/card/delete?id=${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorDetails = error.response?.data;
      throw new ApiError(
        error.response?.status || 500,
        "Network response was not ok",
        errorDetails
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const createCard = async (): Promise<CardType> => {
  try {
    const response = await api.post<CardType>("/card/create");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorDetails = error.response?.data;
      throw new ApiError(
        error.response?.status || 500,
        "Network response was not ok",
        errorDetails
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
