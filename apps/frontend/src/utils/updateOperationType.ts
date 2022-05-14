import { TypeOperation } from '@prisma/client';

export const updateOperationType = (type: TypeOperation): string => {
  if (type === TypeOperation.ARRIVAL) {
    return 'приход';
  } else if (type === TypeOperation.EXPENSE) {
    return 'расход';
  } else {
    return '';
  }
};
