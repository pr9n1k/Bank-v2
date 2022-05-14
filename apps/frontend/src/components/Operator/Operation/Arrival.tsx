import React, { FC, useEffect, useState } from 'react';
import ArrivalForm from './ArrivalForm';
import { Col, Row } from 'antd';
import { Individual, Legal, TypeOperation } from '@prisma/client';
import { createOperation } from '@bank-v2/interface';
interface ArrivalType {
  account: Legal | Individual;
}
const Arrival: FC<ArrivalType> = ({ account }) => {
  const idEmployee = localStorage.getItem('user') || '0';
  const [operation, setOperation] = useState<createOperation>({
    currency: account.currency,
    employeeId: parseInt(idEmployee),
    inn: '',
    money: 0,
    name: '',
    numberAccount: account.number,
    surname: '',
    purpose: '',
    type: TypeOperation.ARRIVAL,
    patronymic: '',
  });
  return (
    <>
      <h1 className="h1 title">Приход</h1>
      <Row>
        <Col span={12} offset={6}>
          <ArrivalForm operation={operation} setOperation={setOperation} />
        </Col>
      </Row>
    </>
  );
};

export default Arrival;
