import { Individual, Legal } from '@prisma/client';
import Search from 'antd/lib/input/Search';
import React, { FC, useState } from 'react';
import { legalAPI } from './../../../service/legalService';
import { individualAPI } from './../../../service/individualService';

type BorrowerFilterType = {
  setAccount: React.Dispatch<
    React.SetStateAction<Legal | Individual | undefined>
  >;
};

const AccountFilter: FC<BorrowerFilterType> = ({ setAccount }) => {
  const { data: legal } = legalAPI.useGetQuery();
  const { data: individual } = individualAPI.useGetAllQuery();
  const allAccount: (Legal | Individual)[] = [];
  if (legal?.length) {
    legal.forEach((acc) => allAccount.push(acc));
  }
  if (individual?.length) {
    individual.forEach((acc) => allAccount.push(acc));
  }
  const [input, setInput] = useState('');
  const onSearch = () => {
    allAccount?.forEach((acc) => {
      if (acc.number === input) {
        setAccount(acc);
      }
    });
  };
  return (
    <Search
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onSearch={onSearch}
      placeholder="Введите номер счета.."
      style={{ width: '200px', margin: '20px auto' }}
    />
  );
};

export default AccountFilter;
