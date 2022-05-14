import { Col, message, Row } from 'antd';
import React, { useState } from 'react';
import { employeeAPI } from '../../service/employeeService';
import EmployeeForm from '../Admin/Employee/EmployeeForm';
import { createEmployee } from '@bank-v2/interface';
import { Role } from '@prisma/client';
type CreateAdminProps = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};
const CreateAdmin: React.FC<CreateAdminProps> = ({ setStep }) => {
  const [create, { isLoading }] = employeeAPI.useCreateMutation();
  const [employee, setEmployee] = useState<createEmployee>({
    login: '',
    name: '',
    password: '',
    patronymic: '',
    phone: '',
    role: Role.ADMIN,
    surname: '',
  });
  const reset = () => {
    setStep(2);
  };

  const submit = async () => {
    await create(employee)
      .unwrap()
      .then(() => {
        message.success('Администратор добавлен');
        setStep(4);
      })
      .catch((e: any) => message.error(e.data.message));
  };
  return (
    <>
      <h1 className="h1 title">Регистрация администратора</h1>
      <Row>
        <Col span={12} offset={6}>
          <EmployeeForm
            employee={employee}
            isLoading={isLoading}
            reset={reset}
            setEmployee={setEmployee}
            submit={submit}
            titleButton={'Создать'}
            setStep={setStep}
          />
        </Col>
      </Row>
    </>
  );
};

export default CreateAdmin;
