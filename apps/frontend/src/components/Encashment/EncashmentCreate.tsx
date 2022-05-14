import { Col, Row } from 'antd';
import React, { useState } from 'react';
import { createEncashment } from '@bank-v2/interface';
import { TypeEncashment } from '@prisma/client';
import EncashmentDataForm from './EncashmentDataForm';
import EncahsmentFinish from './EncahsmentFinish';

const EncashmentCreate = () => {
  const id = localStorage.getItem('user') || '';
  const [encashment, setEncashment] = useState<createEncashment>({
    operatorId: parseInt(id),
    type: TypeEncashment.ENCASHMENT,
    encashmentValue: [],
  });
  const [visible, setVisible] = useState(false);
  const submit = () => {
    setVisible(true);
  };
  return (
    <>
      <h1 className="h1 title">Инкассация</h1>
      <Row>
        <Col span={8} offset={8}>
          {!visible && (
            <EncashmentDataForm
              encashment={encashment}
              setEncashment={setEncashment}
              submit={submit}
            />
          )}
          {visible && (
            <EncahsmentFinish encashment={encashment} setVisible={setVisible} />
          )}
        </Col>
      </Row>
    </>
  );
};

export default EncashmentCreate;
