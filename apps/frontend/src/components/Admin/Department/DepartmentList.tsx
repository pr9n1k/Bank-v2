import { List } from 'antd';
import React from 'react';
import { departmentAPI } from '../../../service/department';
import DepartmentItem from './DepartmentItem';

const DepartmentList = () => {
  const { data: list, isLoading, error } = departmentAPI.useGetQuery();

  if (isLoading) {
    return <h1>Загрузка..</h1>;
  }
  if (!list?.length) {
    return <h1 className="h1 title">Список пуст</h1>;
  }
  return (
    <>
      <h1 className="h1 title">Отделения</h1>
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
        dataSource={list}
        renderItem={(item, i) => (
          <List.Item key={i}>
            <DepartmentItem department={item} />
          </List.Item>
        )}
      />
    </>
  );
};

export default DepartmentList;
