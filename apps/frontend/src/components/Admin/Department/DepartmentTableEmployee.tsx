import { Button, Table, Popconfirm } from 'antd';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { employeeAPI } from './../../../service/employeeService';
import { useBank } from './../../../hooks/useBank';
import { updateValueRole } from './../../../utils/updateValueRole';
import { Employee } from '@prisma/client';
type dataTableType = {
  key: number;
  id: number;
  surname: string;
  name: string;
  patronymic: string | null;
  role: string;
  phone: string;
  departmentId: number;
};
const DepartmentTableEmployee = () => {
  const params = useParams();
  const [visible, setVisible] = useState(false);
  const { data: Bank, isLoading } = useBank();
  const depId = params['id'] || '';

  const { data: employee, isLoading: isLoadingDep } =
    employeeAPI.useGetByIdDepartmentQuery(depId);
  const { data: employeeBank, isLoading: isLoadingBank } =
    employeeAPI.useGetByBankQuery();

  const [update] = employeeAPI.useUpdateMutation();

  if (isLoading) {
    return <h1>Загрузка...</h1>;
  }
  const columns = [
    {
      title: 'Фамилия',
      dataIndex: 'surname',
      key: 'surname',
    },
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Отчество',
      dataIndex: 'patronymic',
      key: 'patronymic',
    },
    {
      title: 'Роль',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Действие',
      //   dataIndex: 'idDepartment',
      key: 'action',
      render: (record: Employee) =>
        record.departmentId === Bank?.id ? (
          <Popconfirm title="Добавить?" onConfirm={() => hundlerAdd(record.id)}>
            <a>Добавить</a>
          </Popconfirm>
        ) : (
          <Popconfirm title="Убрать?" onConfirm={() => hundleDelete(record.id)}>
            <a>Убрать</a>
          </Popconfirm>
        ),
    },
  ];

  const hundlerAdd = (id: number) => {
    employeeBank &&
      employeeBank.map((item) => {
        if (item.id === id) {
          update({ ...item, departmentId: parseInt(depId) });
        }
      });
  };
  const hundleDelete = (id: number) => {
    employee &&
      Bank &&
      employee.map((item) => {
        if (item.id === id) {
          update({ ...item, departmentId: Bank?.id });
        }
      });
  };
  const dataTable: dataTableType[] = [];
  let index = 0;
  if (!isLoadingDep && !isLoadingBank) {
    employee &&
      employee.forEach((item, i) => {
        const role = updateValueRole(item.role);
        dataTable.push({
          key: i,
          id: item.id,
          surname: item.surname,
          name: item.name,
          patronymic: item.patronymic,
          role: role,
          phone: item.phone,
          departmentId: item.departmentId,
        });
        index++;
      });
    employeeBank &&
      employeeBank.forEach((item, i) => {
        const role = updateValueRole(item.role);
        i += index;
        if (item.role !== 'ADMIN' && visible) {
          dataTable.push({
            key: i,
            id: item.id,
            surname: item.surname,
            name: item.name,
            patronymic: item.patronymic,
            role: role,
            phone: item.phone,
            departmentId: item.departmentId,
          });
        }
      });
  }

  return (
    <>
      <Table columns={columns} dataSource={dataTable} pagination={false} />
      <Button
        style={{ marginTop: '20px' }}
        onClick={() => {
          setVisible(!visible);
        }}
      >
        {visible ? 'Скрыть' : 'Показать'} резерв
      </Button>
    </>
  );
};

export default DepartmentTableEmployee;
