import { Button, message } from 'antd';
import React from 'react';
import { employeeAPI } from '../../service/employeeService';
import { encashmentAPI } from '../../service/encashmentService';
import { formateDate } from './../../utils/formateDate';
import { formatEncashment } from './../../utils/formateEncashment';
import { TypeEncashment } from '@prisma/client';

const EncashmentConfirm = () => {
  const id = localStorage.getItem('user') || '0';
  const { data: encashment } = encashmentAPI.useGetCashierQuery(id);
  const { data: operator } = employeeAPI.useGetByIdQuery(
    encashment?.operatorId.toString() || ''
  );
  const [remove] = encashmentAPI.useRemoveMutation();
  const [isCashier] = encashmentAPI.useIsCashierMutation();
  const onClick = () => {
    isCashier({
      id: parseInt(id),
      encashmentId: encashment?.id || 0,
    })
      .unwrap()
      .then(() => message.success('Запрос выполнен'))
      .catch((e) => message.error(e.data.message));
  };
  if (!encashment?.ValueEncashment.length) {
    return <h1 className="h1 title">Пусто</h1>;
  }
  const hundlerRemove = () => {
    remove(encashment?.id)
      .unwrap()
      .then(() => message.success('Заказ отменен'))
      .catch((e) => message.error(e.data.message));
  };
  return (
    <div>
      <h1 className="h1 title">Инкассация</h1>
      <div>
        <p>
          Оператор: {operator?.surname} {operator?.name} {operator?.patronymic}
        </p>
        <p>Дата: {formateDate(encashment?.createdAt || 0)}</p>
        <p>Тип: {formatEncashment(encashment?.type || null)}</p>
        {encashment?.ValueEncashment.map((item) => {
          return (
            <p key={item.id}>
              {item.currency}: {item.money}
            </p>
          );
        })}
        <Button onClick={onClick}>Подтвердить</Button>
        {encashment.type === TypeEncashment.ENCASHMENT && (
          <Button onClick={hundlerRemove}>Отменить</Button>
        )}
      </div>
    </div>
  );
};

export default EncashmentConfirm;
