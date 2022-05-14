import { Employee } from '@prisma/client';
import { Button, Col, Row } from 'antd';
import React, { useState } from 'react';
import { employeeAPI } from './../../../service/employeeService';
import AdminUpdateForm from './AdminUpdateForm';
const Admin = () => {
  const [visible, setVisible] = useState(false);
  const { data: employee, isLoading } = employeeAPI.useGetByAdminQuery();
  console.log(employee);

  return (
    <Row>
      <Col span={12}>
        <h2 className="h1">Информация</h2>
        <p>Фамилия: {employee?.surname}</p>
        <p>Имя: {employee?.name}</p>
        <p>Отчество: {employee?.patronymic}</p>
        <p>Роль: {employee?.role}</p>
        <p>Телефон: {employee?.phone}</p>
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
        </div>
      </Col>
      <Col span={12}>
        {visible && employee ? (
          <AdminUpdateForm setVisible={setVisible} oldAdmin={employee} />
        ) : null}
      </Col>
    </Row>
  );
};

export default Admin;
