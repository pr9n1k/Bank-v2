import { Role } from '@prisma/client';

export type createEmployee = {
  login: string;
  password: string;
  name: string;
  patronymic?: string;
  surname: string;
  phone: string;
  role: Role;
};
