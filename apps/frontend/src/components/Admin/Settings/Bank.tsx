import { departmentAPI } from '../../../../src/service/department';
import React, { useState } from 'react';
import { Button, Col, Row } from 'antd';
import BankInfoForm from './BankInfoForm';
import BankAccountForm from './BankAccountForm';
enum windowType {
  NULL,
  INFO,
  ACCOUNT,
}
const Bank = () => {
  const { data: info } = departmentAPI.useGetInfoBankQuery();
  const [visible, setVisible] = useState(false);
  const [window, setWindow] = useState<windowType>(windowType.NULL);
  const hundleInfo = () => {
    setVisible(true);
    setWindow(windowType.INFO);
  };
  const hundleAccount = () => {
    setVisible(true);
    setWindow(windowType.ACCOUNT);
  };
  if (!info) {
    return <h1>Ошибка...</h1>;
  }
  return (
    <Row>
      <Col span={4}>
        <h2>Информация о банке</h2>
        <p>Номер: {info?.bank.number}</p>
        <p>
          Адрес: г.{info?.bank.city}, ул.{info?.bank.street}, д.
          {info?.bank.house}
        </p>
        <p>Отделений: {info?.department}</p>
        <p>Сотрудников: {info?.employee}</p>
        <p>Счета:</p>
        {info?.value.map((item) => {
          return (
            <p key={item.id}>
              {item.currency}: {item.money}
            </p>
          );
        })}
      </Col>
      <Col span={8} offset={8}>
        {!visible && (
          <div className="flex justify-center">
            <Button onClick={hundleInfo}>Изменить данные</Button>
            <Button onClick={hundleAccount}>Работа со счетами</Button>
          </div>
        )}
        {visible && window === windowType.INFO ? (
          <BankInfoForm bank={info?.bank} setVisible={setVisible} />
        ) : visible && window === windowType.ACCOUNT ? (
          <BankAccountForm setVisible={setVisible} />
        ) : null}
      </Col>
    </Row>
  );
};

export default Bank;
