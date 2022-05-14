import { Card } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { updateValueRole } from './../../../utils/updateValueRole';
import { Employee } from '@prisma/client';
interface EmployeeItemType {
  employee: Employee;
}
const EmployeeItem: React.FC<EmployeeItemType> = ({ employee }) => {
  const role = updateValueRole(employee?.role);
  return (
    <Card title={`${employee.surname} ${employee.name} ${employee.patronymic}`}>
      <h2>Информация:</h2>
      <p>Телефон: {employee.phone}</p>
      <p>Роль: {role}</p>
      <Link to={`/admin/employee/${employee?.id}`}>Открыть</Link>
    </Card>
  );
};

export default EmployeeItem;
