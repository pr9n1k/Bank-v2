import { Currency } from '@prisma/client';

export type updateLegal = {
  id: number;
  clientId?: number;
  title?: string;
  inn?: number;
  currency?: Currency;
  money?: number;
};
