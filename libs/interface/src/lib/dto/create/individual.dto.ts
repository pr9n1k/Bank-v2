import { Currency } from '@prisma/client';

export type createIndividual = {
  clientId: number;
  currency: Currency;
};
