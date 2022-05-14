import { TypeEncashment, ValueEncashment } from '@prisma/client';

export type encashmentResponse = {
  updateAt: string;
  cashierId: number;
  createdAt: Date;
  departmentId: number;
  id: number;
  isAdmin: boolean;
  isCashier: boolean;
  operatorId: number;
  type: TypeEncashment;
  ValueEncashment: ValueEncashment[];
};
