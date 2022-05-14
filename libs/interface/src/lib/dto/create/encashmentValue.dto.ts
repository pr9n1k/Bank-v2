import { Currency } from '@prisma/client';
export type createEncashmentValue = {
  currency: Currency;
  money: number;
};
