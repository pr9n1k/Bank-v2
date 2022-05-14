import { Currency } from '@prisma/client';

export type createAccountDepartment = {
  departmentId: number;
  currency: Currency;
};
