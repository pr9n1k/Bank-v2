import { List, Pagination } from 'antd';
import React, { useState } from 'react';
import EmployeeItem from './EmployeeItem';
import { employeeAPI } from './../../../service/employeeService';
import { limit } from '@bank-v2/const';

const EmployeeList = () => {
  const [page, setPage] = useState('1');
  const { data, isLoading, error } = employeeAPI.useGetQuery({
    limit: limit,
    page,
  });

  const totalCount = data && data.total ? data.total : 0;
  console.log(totalCount);

  const onChange = (page: number) => {
    setPage(page.toString());
  };
  if (isLoading) {
    return <h1>Загрузка...</h1>;
  }
  if (data && !data.value.length) {
    return <h1 className="h1 title">Список пуст</h1>;
  }
  return (
    <>
      <h1 className="h1 title">Сотрудники</h1>
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
          dataSource={data?.value}
          renderItem={(item, i) => (
            <List.Item key={i}>
              <EmployeeItem employee={item} />
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

export default EmployeeList;
