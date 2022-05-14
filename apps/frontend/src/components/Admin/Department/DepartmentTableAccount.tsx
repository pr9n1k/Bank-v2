import { AccountDepartment } from '@prisma/client';
import { Table } from 'antd';
import React, { FC } from 'react';
interface DepartmentTableAccountType {
  account: AccountDepartment[];
}
type dataType = {
  key: number;
  number: string;
  currency: string;
  money: number;
};
const DepartmentTableAccount: FC<DepartmentTableAccountType> = ({
  account,
}) => {
  const columns = [
    {
      title: 'Номер счета',
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
  account.forEach((item, i) => {
    data.push({
      key: i,
      number: item.number,
      currency: item.currency,
      money: item.money,
    });
  });
  return (
    <>
      <h2>Счета</h2>
      <Table columns={columns} dataSource={data} pagination={false} />
    </>
  );
};

export default DepartmentTableAccount;
