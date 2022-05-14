import { encashmentResponse } from '@bank-v2/interface';
import { TypeEncashment } from '@prisma/client';
import { Button, Col, Row, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { employeeAPI } from '../../service/employeeService';
import { encashmentAPI } from '../../service/encashmentService';
import { formateDate } from '../../utils/formateDate';
import { formatEncashment } from '../../utils/formateEncashment';
import { departmentAPI } from './../../service/department';
import EncashmentUpdateForm from './EncashmentUpdateForm';

const Encashment = () => {
  const param = useParams();
  const navigate = useNavigate();
  const id = param['id'] || '';
  const [visible, setVisible] = useState(false);
  const { data: encashment } = encashmentAPI.useGetByIdForAdminQuery(
    parseInt(id)
  );

  const { data: operator } = employeeAPI.useGetByIdQuery(
    encashment?.operatorId.toString() || ''
  );
  const { data: department } = departmentAPI.useGetByIdQuery(
    encashment?.departmentId || 1
  );
  const [isAdmin] = encashmentAPI.useIsAdminMutation();
  const [remove] = encashmentAPI.useRemoveMutation();
  const submit = () => {
    encashment &&
      isAdmin({ id: encashment?.id })
        .unwrap()
        .then(() => {
          message.success('Подтвержден');
          navigate('/admin/encashment');
        })
        .catch((e) => message.error(e.data.message));
  };
  const update = () => setVisible(true);
  const hundlerRemove = () => {
    encashment &&
      remove(encashment?.id)
        .unwrap()
        .then(() => {
          message.success('Заказ отменен');
          navigate('/admin/encashment');
        })
        .catch((e) => message.error(e.data.message));
  };
  return (
    <div>
      <h1 className="h1 title">Инкассация</h1>
      <Row>
        <Col span={12}>
          <p>Отделение №{department?.number}</p>
          <p>
            Оператор: {operator?.surname} {operator?.name}{' '}
            {operator?.patronymic}
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
          <Button type="primary" onClick={submit}>
            Подтвердить
          </Button>
          {!visible && encashment?.type === TypeEncashment.REINFORCEMENT ? (
            <Button onClick={update}>Изменить</Button>
          ) : null}
          {encashment?.type === TypeEncashment.REINFORCEMENT && (
            <Button onClick={hundlerRemove}>Отменить</Button>
          )}
        </Col>
        {visible && encashment ? (
          <Col span={12}>
            <EncashmentUpdateForm
              value={encashment.ValueEncashment}
              setVisible={setVisible}
            />
          </Col>
        ) : null}
      </Row>
    </div>
  );
};

export default Encashment;
