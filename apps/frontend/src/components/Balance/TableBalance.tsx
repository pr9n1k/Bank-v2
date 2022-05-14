import { Table } from 'antd';
import React, { FC } from 'react';
import { AccountDepartment, Currency } from '@prisma/client';
interface TableBalanceType {
  account: AccountDepartment[];
}
type dataType = {
  key: number;
  number: string;
  currency: Currency;
  money: number;
};
const TableBalance: FC<TableBalanceType> = ({ account }) => {
  const columns = [
    {
      title: 'Счет',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'Валюта',
      dataIndex: 'currency',
      key: 'currency',
    },
    {
      title: 'Сумма',
      dataIndex: 'money',
      key: 'money',
    },
  ];
  const data: dataType[] = [];
  account.forEach((acc, i) =>
    data.push({
      key: i,
      number: acc.number,
      currency: acc.currency,
      money: acc.money,
    })
  );
  return <Table columns={columns} dataSource={data} pagination={false} />;
};

export default TableBalance;
