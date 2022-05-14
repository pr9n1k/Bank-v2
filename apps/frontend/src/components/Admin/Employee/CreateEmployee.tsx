import { Col, message, Row } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { employeeAPI } from '../../../service/employeeService';
import EmployeeForm from './EmployeeForm';
import { createEmployee } from '@bank-v2/interface';

const CreateEmployee = () => {
  const navigate = useNavigate();
  const [create, { isLoading }] = employeeAPI.useCreateMutation();
  const [employee, setEmployee] = useState<createEmployee>({
    login: '',
    name: '',
    password: '',
    patronymic: '',
    phone: '',
    role: 'ADMIN',
    surname: '',
  });
  const reset = () => {
    navigate(-1);
  };

  const submit = async () => {
    await create(employee)
      .unwrap()
      .then(() => {
        navigate('/admin/employee');
        message.success('Сотрудник добавлен');
      })
      .catch((e: any) => message.error(e.data.message));
  };
  return (
    <>
      <h1 className="h1 title">Добавить сотрудника</h1>
      <Row>
        <Col span={12} offset={6}>
          <EmployeeForm
            employee={employee}
            isLoading={isLoading}
            reset={reset}
            setEmployee={setEmployee}
            submit={submit}
            titleButton={'Создать'}
          />
        </Col>
      </Row>
    </>
  );
};

export default CreateEmployee;
