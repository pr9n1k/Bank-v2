import { limit } from '@bank-v2/const';
import { List, Pagination } from 'antd';
import React from 'react';
import { employeeAPI } from './../../../service/employeeService';
import EmployeeItem from './EmployeeItem';

const EmlpoyeeNotWorkList = () => {
  const [page, setPage] = React.useState('1');
  const { data } = employeeAPI.useGetNotWorkQuery({
    limit: limit,
    page,
  });
  const onChange = (page: number) => {
    setPage(page.toString());
  };
  const totalCount = data && data.total ? data.total : 0;
  if (!data?.value.length) {
    return <h1 className="h1 title">Список пуст</h1>;
  }
  return (
    <>
      <div style={{ flex: '1 0 auto' }}>
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

export default EmlpoyeeNotWorkList;
