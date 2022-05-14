import { Role } from '@prisma/client';

export type updateEmployee = {
  id: number;
  login?: string;
  password?: string;
  name?: string;
  patronymic?: string;
  surname?: string;
  phone?: string;
  role?: Role;
  departmentId?: number;
};
