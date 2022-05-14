import { Currency, TypeOperation } from '@prisma/client';

export type createOperation = {
  name: string;
  patronymic?: string;
  surname: string;
  numberAccount: string;
  employeeId: number;
  type: TypeOperation;
  currency: Currency;
  money: number;
  inn: string;
  purpose: string;
};
