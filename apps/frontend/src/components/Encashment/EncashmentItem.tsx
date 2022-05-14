import React from 'react';
import { Encashment } from '@prisma/client';
import { departmentAPI } from './../../service/department';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import { employeeAPI } from './../../service/employeeService';
import { formateDate } from './../../utils/formateDate';
import { formatEncashment } from './../../utils/formateEncashment';
type EncashmentItemProps = {
  encashment: Encashment;
};
const EncashmentItem: React.FC<EncashmentItemProps> = ({ encashment }) => {
  const { data: department } = departmentAPI.useGetByIdEmployeeQuery(
    encashment.operatorId
  );
  const { data: operator } = employeeAPI.useGetByIdQuery(
    encashment.operatorId.toString()
  );

  return (
    <Card title={`Отделение №${department?.number}`}>
      <h2>Информация:</h2>
      <p>Дата: {formateDate(encashment.createdAt)}</p>
      <p>
        Операционист: {operator?.surname} {operator?.name.substring(0, 1)}.
        {operator?.patronymic?.substring(0, 1)}.
      </p>
      <p>Тип: {formatEncashment(encashment.type)}</p>
      <Link to={`/admin/encashment/${encashment?.id}`}>Открыть</Link>
    </Card>
  );
};

export default EncashmentItem;
