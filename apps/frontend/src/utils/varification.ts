import { Role } from '@prisma/client';

export const isVatification = (value: Role, role: Role) => {
  return role === value ? true : false;
};
