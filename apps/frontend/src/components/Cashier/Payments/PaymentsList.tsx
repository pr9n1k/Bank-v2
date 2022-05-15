import { List, Pagination } from 'antd';
import { operationAPI } from '../../../../src/service/operationServise';
import React, { useState } from 'react';
import PaymentsItem from './PaymentsItem';
import { limit } from '@bank-v2/const';

const PaymentnsList = () => {
  const idEmployee = localStorage.getItem('user') || '';
  const [page, setPage] = useState('1');
  const { data } = operationAPI.useGetNotConfirmQuery({
    id: parseInt(idEmployee),
    limit: limit,
    page,
  });
  const totalCount = data && data.total ? data.total : 0;
  const onChange = (page: number) => {
    setPage(page.toString());
  };
  if (!data?.value.length) {
    return <h1 className="h1 title">Список пуст</h1>;
  }

  return (
    <>
      <h1 className="h1 title">Платежи</h1>
      <div className="flex-auto">
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 2,
            xl: 3,
            xxl: 3,
          }}
          dataSource={data.value}
          renderItem={(item) => (
            <List.Item>
              <PaymentsItem operation={item} />
            </List.Item>
          )}
        />
      </div>
      {totalCount > 6 && (
        <Pagination
          current={parseInt(page)}
          onChange={onChange}
          total={totalCount}
          defaultPageSize={6}
          defaultCurrent={1}
        />
      )}
    </>
  );
};

export default PaymentnsList;
