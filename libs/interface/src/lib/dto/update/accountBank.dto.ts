import { Currency } from '@prisma/client';

export enum updateTypeAccountBank {
  GET,
  ADD,
}
export type updateAccountBank = {
  currency: Currency;
  money: number;
};
export type updateAccountsBank = {
  type: updateTypeAccountBank;
  value: updateAccountBank[];
};
