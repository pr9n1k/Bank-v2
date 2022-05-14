import { Popconfirm, Table, message } from 'antd';
import React, { FC } from 'react';
import { Currency, Individual, Legal } from '@prisma/client';
import { legalConst } from '@bank-v2/const';
import { takeTypeAccount } from './../../../utils/takeTypeAccount';
import { legalAPI } from './../../../service/legalService';
import { individualAPI } from './../../../service/individualService';
interface AccountTableType {
  individual?: Individual[];
  legal?: Legal[];
}
type DataType = {
  id: number;
  key: number;
  number: string;
  currency: Currency;
  money: number;
};
const AccountTable: FC<AccountTableType> = ({ individual, legal }) => {
  const [removeLegal] = legalAPI.useRemoveMutation();
  const [removeIndividual] = individualAPI.useRemoveMutation();
  const hundlerRemoveLegal = (id: number) => {
    removeLegal(id)
      .unwrap()
      .then(() => {
        message.success('Счет закрыт');
      })
      .catch((e) => message.error(e.data.message));
  };
  const hundlerRemoveIndividual = (id: number) => {
    removeIndividual(id)
      .unwrap()
      .then(() => {
        message.success('Счет закрыт');
      })
      .catch((e) => message.error(e.data.message));
  };
  const columns = [
    {
      title: '№ счета',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'Валюта',
      dataIndex: 'currency',
      key: 'currency',
    },
    {
      title: 'Текущая сумма',
      dataIndex: 'money',
      key: 'money',
    },
    {
      title: 'Действие',
      //   dataIndex: 'idDepartment',
      key: 'action',
      render: (record: Legal | Individual) =>
        takeTypeAccount(record.number) === legalConst ? (
          <Popconfirm
            title="Добавить?"
            onConfirm={() => hundlerRemoveLegal(record.id)}
          >
            <a>Загрыть счет</a>
          </Popconfirm>
        ) : (
          <Popconfirm
            title="Убрать?"
            onConfirm={(e) => hundlerRemoveIndividual(record.id)}
          >
            <a>Загрыть счет</a>
          </Popconfirm>
        ),
    },
  ];

  const data: DataType[] = [];
  individual &&
    individual.forEach((acc, i) =>
      data.push({
        id: acc.id,
        key: i,
        number: acc.number,
        currency: acc.currency,
        money: acc.money,
      })
    );
  legal &&
    legal.forEach((acc, i) =>
      data.push({
        id: acc.id,
        key: i,
        number: acc.number,
        currency: acc.currency,
        money: acc.money,
      })
    );
  if (!data.length) {
    return null;
  }
  return <Table columns={columns} dataSource={data} pagination={false} />;
};

export default AccountTable;
