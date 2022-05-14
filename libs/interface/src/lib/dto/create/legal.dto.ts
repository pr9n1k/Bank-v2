import { Currency, LegalType } from '@prisma/client';
export type createLegal = {
  clientId: number;
  title: string;
  inn: number;
  currency: Currency;
  type: LegalType;
};
