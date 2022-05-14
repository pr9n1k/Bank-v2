import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { departmentAPI } from './../../../service/department';
import { Row, Col, Popconfirm, Button, message } from 'antd';
import DepartmentEmployee from './DepartmentEmployee';
import { accountAPI } from './../../../service/accountDepartment';
import DepartmentTableAccount from './DepartmentTableAccount';

const Department = () => {
  const params = useParams();
  const id = params['id'] || '';
  const navigate = useNavigate();

  const { data: department } = departmentAPI.useGetByIdQuery(parseInt(id));
  const { data: account, isLoading: isLoadingAccount } =
    accountAPI.useGetByIdDepartmentQuery(department?.id || 0);
  const [deleteById] = departmentAPI.useDeleteByIdMutation();
  if (isLoadingAccount) {
    return <h1>Загрузка...</h1>;
  }
  const hundleDelete = () => {
    deleteById(parseInt(id))
      .unwrap()
      .then(() => {
        message.success('отдел удален');
        navigate('/admin/department');
      })
      .catch((e) => message.error(e.data.message));
  };

  return (
    <>
      <h1 className="h1 title">Информация про отдел</h1>
      <Row gutter={20}>
        <Col span={6}>
          <h2>Номер отдела: {department?.number}</h2>
          <h2>
            Адрес:г.{department?.city}, ул.{department?.street}, д.
            {department?.house}
          </h2>
          {account && <DepartmentTableAccount account={account} />}
          <Popconfirm title="Удалить?" onConfirm={hundleDelete}>
            <Button>Удалить</Button>
          </Popconfirm>
        </Col>
        <Col span={12} offset={6}>
          {<DepartmentEmployee />}
        </Col>
      </Row>
    </>
  );
};

export default Department;
