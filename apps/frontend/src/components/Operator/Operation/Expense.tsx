import React, { FC, useEffect, useState } from 'react';
import { clientAPI } from './../../../service/clientService';
import { message, Row, Col } from 'antd';
import { operationAPI } from '../../../service/operationServise';
import { Legal, Individual, TypeOperation } from '@prisma/client';
import { createOperation } from '@bank-v2/interface';
import { accountAPI } from './../../../service/accountDepartment';
import InfoClient from './InfoClient';
import ExpenseForm from './ExpenseForm';
interface ExpenseType {
  account: Legal | Individual;
}
const Expense: FC<ExpenseType> = ({ account }) => {
  const { data: client } = clientAPI.useGetByIdQuery(account.clientId);
  const [addOperation] = operationAPI.useAddMutation();
  const [visible, setVisible] = useState(false);
  const idEmployee = localStorage.getItem('user') || '';

  const [operation, setOperation] = useState<createOperation>({
    currency: account.currency,
    employeeId: parseInt(idEmployee),
    inn: '',
    money: 0,
    name: '',
    numberAccount: account.number,
    surname: '',
    purpose: 'Снятие наличных средств',
    type: TypeOperation.EXPENSE,
    patronymic: '',
  });
  const { data: departmentAccounts } = accountAPI.useGetByIdEmployeeQuery(
    parseInt(idEmployee)
  );
  const departmentAccount = departmentAccounts?.filter(
    (item) => item.currency === account.currency
  )[0];
  const reset = () => {
    setVisible(false);
  };
  const submit = () => {
    addOperation(operation)
      .unwrap()
      .then(() => {
        setVisible(false);
        message.success('Операция создана');
      })
      .catch((e) => message.error(e.data.message));
  };
  const onClick = (
    name: string,
    surname: string,
    inn: string,
    patronymic: string
  ) => {
    setOperation({
      ...operation,
      name,
      patronymic,
      surname,
      inn: inn,
    });
    setVisible(true);
  };
  return (
    <>
      <h1 className="h1 title">Расход</h1>
      <div>
        <p>Номер счета кассы: {departmentAccount?.number}</p>
        <p>Номер счета клиента: {account.number}</p>
        <Row>
          <Col>
            {client?.id && (
              <InfoClient client={client} cb={onClick} money={account.money} />
            )}
          </Col>
          {visible && (
            <Col offset={4}>
              <ExpenseForm
                reset={reset}
                submit={submit}
                operation={operation}
                setOperation={setOperation}
              />
            </Col>
          )}
        </Row>
      </div>
    </>
  );
};

export default Expense;
