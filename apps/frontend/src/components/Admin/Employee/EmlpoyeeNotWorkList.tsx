import { List } from 'antd';
import React, { useState } from 'react';
import { employeeAPI } from './../../../service/employeeService';
import EmployeeItem from './EmployeeItem';

const EmlpoyeeNotWorkList = () => {
  const [page, setPage] = useState(1);
  const { data: employee } = employeeAPI.useGetNotWorkQuery();
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
          dataSource={employee}
          renderItem={(item, i) => (
            <List.Item key={i}>
              <EmployeeItem employee={item} />
            </List.Item>
          )}
        />
      </div>
      {/* {totalCount > 6 && (
        <Pagination
          current={page}
          onChange={onChange}
          total={totalCount}
          defaultPageSize={6}
          defaultCurrent={1}
        />
      )} */}
    </>
  );
};

export default EmlpoyeeNotWorkList;
