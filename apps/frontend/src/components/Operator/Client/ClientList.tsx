import { List, Pagination } from 'antd';
import React from 'react';
import ClientItem from './ClientItem';
import { clientAPI } from '../../../service/clientService';
import { limit } from '@bank-v2/const';

const ClientList = () => {
  const [page, setPage] = React.useState('1');
  const { data, isLoading } = clientAPI.useGetQuery({
    limit: limit,
    page,
  });
  const totalCount = data && data.total ? data.total : 0;
  if (isLoading) {
    return <h1>Загрузка...</h1>;
  }

  const onChange = (page: number) => {
    setPage(page.toString());
  };
  if (!data?.value.length) {
    return <h1>Список пуст</h1>;
  }
  return (
    <>
      <h1 className="h1 title">Клиенты</h1>
      <List
        className="flex-auto"
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
            <ClientItem client={item} />
          </List.Item>
        )}
      />
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

export default ClientList;
