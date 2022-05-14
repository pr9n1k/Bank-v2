import { Role } from '@prisma/client';

export const updateValueRole = (role: Role): string => {
  if (role === Role.ADMIN) {
    return 'Админ';
  } else if (role === Role.OPERATOR) {
    return 'Операционист';
  } else if (role === Role.CASHIER) {
    return 'Кассир';
  } else {
    return '';
  }
};
