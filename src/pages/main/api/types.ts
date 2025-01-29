export interface CardType {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export type DeleteCardDTO = Partial<CardType>;
