import { Button, Col, message, Popconfirm, Row } from 'antd';
import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { employeeAPI } from './../../../service/employeeService';
import { departmentAPI } from './../../../service/department';
import EmployeeUpdate from './EmployeeUpdate';
import { updateValueRole } from './../../../utils/updateValueRole';
import { useBank } from '../../../hooks/useBank';
import { Role } from '@prisma/client';

const Employee = () => {
  const { data: Bank } = useBank();
  const navigate = useNavigate();
  const params = useParams();
  const id = params['id'] || '';

  const [visible, setVisible] = useState(false);
  const { data: employee, isLoading, error } = employeeAPI.useGetByIdQuery(id);
  const { data: department } = departmentAPI.useGetByIdQuery(
    employee?.departmentId || 1
  );
  const role = employee ? updateValueRole(employee?.role) : '';
  const [deleteById] = employeeAPI.useDeleteByIdMutation();
  const [routate] = employeeAPI.useRoutateMutation();

  if (isLoading) {
    return <h1>Загрузка...</h1>;
  }

  const hundlerDelete = () => {
    deleteById(id);
    navigate('/admin/employee');
  };
  const hudlerRoutate = () => {
    routate(id)
      .unwrap()
      .then(() => {
        navigate('/admin/employee');
        message.success('Сотрудник возвращен');
      })
      .catch((e) => message.error(e.data.message));
  };
  return (
    <>
      <h1 className="h1 title">Сотрудник</h1>
      <Row>
        <Col span={12}>
          <h2 className="h1 title">Информация</h2>
          <p>Фамилия: {employee?.surname}</p>
          <p>Имя: {employee?.name}</p>
          <p>Отчество: {employee?.patronymic}</p>
          <p>Роль: {role}</p>
          {Bank &&
          employee?.role !== Role.ADMIN &&
          employee?.departmentId !== Bank?.id ? (
            <p>
              Отделение:{' '}
              <Link to={`/admin/department/${employee?.departmentId}`}>
                {department?.number}
              </Link>
            </p>
          ) : null}
          <div>
            {!visible && (
              <Button
                style={{ marginRight: '15px' }}
                type="primary"
                onClick={() => setVisible(true)}
              >
                Редактировать
              </Button>
            )}
            {employee?.isWork ? (
              <Popconfirm title="Удалить сотрудника?" onConfirm={hundlerDelete}>
                <a>Уволить</a>
              </Popconfirm>
            ) : (
              <Popconfirm title="Вернуть сотрудника?" onConfirm={hudlerRoutate}>
                <a>Вернуть</a>
              </Popconfirm>
            )}
          </div>
        </Col>
        <Col span={12}>
          {visible && employee ? (
            <EmployeeUpdate setVisible={setVisible} thisEmployee={employee} />
          ) : null}
        </Col>
      </Row>
    </>
  );
};

export default Employee;
