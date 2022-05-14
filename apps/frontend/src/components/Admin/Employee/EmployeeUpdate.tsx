import React, { FC, useState } from 'react';
import { employeeAPI } from './../../../service/employeeService';
import { message } from 'antd';
import { Employee } from '@prisma/client';
import EmployeeUpdateForm from './EmployeeUpdateForm';
interface EmployeeUpdateType {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  thisEmployee: Employee;
}
const EmployeeUpdate: FC<EmployeeUpdateType> = ({
  setVisible,
  thisEmployee,
}) => {
  const [employee, setEmployee] = useState(thisEmployee);
  const [updateById, { isLoading }] = employeeAPI.useUpdateMutation();
  const submit = () => {
    updateById(employee)
      .unwrap()
      .then(() => {
        setVisible(false);
        message.success('Данные обновлены');
      })
      .catch((e) => message.error(e.data.message));
  };
  const reset = () => {
    setVisible(false);
  };

  return (
    <>
      <h1 className="h1 title">Обновление</h1>
      <EmployeeUpdateForm
        employee={employee}
        isLoading={isLoading}
        reset={reset}
        setEmployee={setEmployee}
        submit={submit}
      />
    </>
  );
};

export default EmployeeUpdate;
