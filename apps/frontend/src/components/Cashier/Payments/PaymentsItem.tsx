import { Button, Card, message, Popconfirm } from 'antd';
import React, { FC } from 'react';
import { Operation } from '@prisma/client';
import { employeeAPI } from '../../../../src/service/employeeService';
import { updateOperationType } from './../../../utils/updateOperationType';
import { operationAPI } from '../../../../src/service/operationServise';
import { formateDate } from './../../../utils/formateDate';
interface PaymentsItemType {
  operation: Operation;
}
const PaymentsItem: FC<PaymentsItemType> = ({ operation }) => {
  const cashierId = localStorage.getItem('user') || '';
  const { data: employee } = employeeAPI.useGetByIdQuery(
    operation.employeeId?.toString() || ''
  );
  const [confirm] = operationAPI.useConfirmMutation();
  const fullNameEmployee = `${employee?.surname} ${employee?.name?.substring(
    0,
    1
  )}. ${employee?.patronymic?.substring(0, 1)}.`;
  const onConfirm = () => {
    confirm({ id: operation.id, cashierId: parseInt(cashierId) })
      .unwrap()
      .then(() => message.success('Выполнено'))
      .catch((e) => message.error(e.data.message));
  };

  return (
    <Card title={operation.number}>
      <p>Дата: {formateDate(operation?.createdAt)}</p>
      <p>Тип: {updateOperationType(operation.type)}</p>
      <p>Валюта: {operation.currency}</p>
      <p>Сумма: {operation.money}</p>
      <p>Операционист: {fullNameEmployee}</p>
      <Popconfirm title="Заверить?" onConfirm={onConfirm}>
        <Button>Заверить</Button>
      </Popconfirm>
    </Card>
  );
};

export default PaymentsItem;
