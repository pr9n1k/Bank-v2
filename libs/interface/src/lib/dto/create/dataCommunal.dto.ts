import { LegalType } from '@prisma/client';

export type createDataCommunal = {
  startData: number;
  endData: number;
  startCounter: number;
  endCounter: number;
  money: number;
  communalType: LegalType;
};
