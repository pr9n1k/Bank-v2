import { TypeEncashment } from '@prisma/client';
import { createEncashmentValue } from './encashmentValue.dto';

export type createEncashment = {
  operatorId: number;
  type: TypeEncashment;
  encashmentValue: createEncashmentValue[];
};
