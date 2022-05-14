import { TypeEncashment } from '@prisma/client';

export const formatEncashment = (type: TypeEncashment | null) => {
  if (type === null) return '';
  if (type === TypeEncashment.ENCASHMENT) {
    return 'Инкассация';
  } else if (type === TypeEncashment.REINFORCEMENT) {
    return 'подкрепление';
  }
  return '';
};
