import { List } from 'antd';
import React from 'react';
import { encashmentAPI } from './../../service/encashmentService';
import EncashmentItem from './EncashmentItem';

const EncashmentList = () => {
  const { data: encashment } = encashmentAPI.useGetAdminQuery();

  if (!encashment?.length) {
    return <h1 className="h1 title">Список пуст</h1>;
  }
  return (
    <>
      <h1 className="h1 title">Сотрудники</h1>
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
          dataSource={encashment}
          renderItem={(item, i) => (
            <List.Item key={i}>
              <EncashmentItem encashment={item} />
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

export default EncashmentList;
