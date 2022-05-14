import { Card } from 'antd';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Department } from '@prisma/client';
interface DepartmentItemType {
  department: Department;
}
const DepartmentItem: FC<DepartmentItemType> = ({ department }) => {
  return (
    <Card title={`${department.number}`}>
      <h2>Информация:</h2>
      <p>Город: {department.city}</p>
      <Link to={`${department.id}`}>Открыть</Link>
    </Card>
  );
};

export default DepartmentItem;
