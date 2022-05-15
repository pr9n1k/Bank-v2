import { limit } from '@bank-v2/const';
import { List, Pagination } from 'antd';
import React from 'react';
import { departmentAPI } from '../../../service/department';
import DepartmentItem from './DepartmentItem';

const DepartmentList = () => {
  const [page, setPage] = React.useState('1');
  const onChange = (page: number) => {
    setPage(page.toString());
  };
  const { data, isLoading, error } = departmentAPI.useGetQuery({
    limit: limit,
    page,
  });
  const totalCount = data && data.total ? data.total : 0;

  if (isLoading) {
    return <h1>Загрузка..</h1>;
  }
  if (!data?.value?.length) {
    return <h1 className="h1 title">Список пуст</h1>;
  }
  return (
    <>
      <h1 className="h1 title">Отделения</h1>
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
          renderItem={(item, i) => (
            <List.Item key={i}>
              <DepartmentItem department={item} />
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

export default DepartmentList;
