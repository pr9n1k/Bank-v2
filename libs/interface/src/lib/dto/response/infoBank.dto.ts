import { Department, AccountDepartment } from '@prisma/client';
export type infoBank = {
  bank: Department;
  employee: number;
  department: number;
  value: AccountDepartment[];
};
