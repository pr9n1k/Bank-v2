import { Sex } from '@prisma/client';

export type createClient = {
  name: string;
  patronymic?: string;
  surname: string;
  sex: Sex;
  phone: string;
  birthDay: number;
  inn: string;

  city: string;
  street: string;
  house: string;
  flat?: string;

  // pasport
  series: string;
  number: string;
  isSued: string;
  isSuedDate: number;
};
