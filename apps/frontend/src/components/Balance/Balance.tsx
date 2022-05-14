import { Button, Col, Row } from 'antd';
import React, { FC } from 'react';
import { accountAPI } from '../../service/accountDepartment';
import TableBalance from './TableBalance';

const Balance = () => {
  const id = localStorage.getItem('user') || '';
  const {
    data: account,
    isLoading,
    error,
  } = accountAPI.useGetByIdEmployeeQuery(parseInt(id));
  if (isLoading) {
    return <h1>Загрузка..</h1>;
  }
  // if(error){
  //     <h1>{error}</h1>
  // }
  return (
    <>
      <h1 className="h1 title">Баланс Кассы</h1>
      {account && (
        <Row>
          <Col span={12} offset={6}>
            <TableBalance account={account} />
          </Col>
        </Row>
      )}
    </>
  );
};

export default Balance;
