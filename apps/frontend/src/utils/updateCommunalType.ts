import { LegalType } from '@prisma/client';

export const updateCommunalType = (type: LegalType): string => {
  if (type === LegalType.GAS) {
    return 'Газ';
  } else if (type === LegalType.LIGHT) {
    return 'Свет';
  } else if (type === LegalType.WATER) {
    return 'Вода';
  } else if (type === LegalType.COMPANY) {
    return 'Компания';
  } else {
    return '';
  }
};
