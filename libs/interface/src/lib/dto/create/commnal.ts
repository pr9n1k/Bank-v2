import { createDataCommunal } from './dataCommunal.dto';

export type createCommunal = {
  name: string;
  patronymic?: string;
  surname: string;
  city: string;
  street: string;
  house: string;
  flat?: string;
  employeeId: number;
  dataCommunal: createDataCommunal[];
};
