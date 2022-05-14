import { Role } from '@prisma/client';
import { Button, message } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTakeEmployee } from '../hooks/useTakeEmployee';
import { isVatification } from '../utils/varification';
import { useBank } from './../hooks/useBank';

const MainButton = () => {
  const router = useNavigate();
  const { data: Bank, isLoading } = useBank();

  const idUser = localStorage.getItem('user');
  if (idUser === '') {
    router('/start');
  }
  const { employee } = useTakeEmployee();
  const onClickAdmin = () => {
    if (
      employee &&
      isVatification(Role.ADMIN, employee.role) &&
      employee?.departmentId === Bank?.id
    ) {
      router('/admin');
    } else {
      message.warning('У Вас нет прав доступа!');
    }
  };
  const onClickCashier = () => {
    if (
      employee &&
      isVatification(Role.CASHIER, employee.role) &&
      employee?.departmentId !== Bank?.id
    ) {
      router('/cashier');
    } else {
      message.warning('У Вас нет прав доступа!');
    }
  };
  const onClickOperator = () => {
    if (
      employee &&
      isVatification(Role.OPERATOR, employee.role) &&
      employee?.departmentId !== Bank?.id
    ) {
      router('/operator');
    } else {
      message.warning('У Вас нет прав доступа!');
    }
  };
  if (isLoading) {
    return <h1>Загрузка...</h1>;
  }
  return (
    <div className="mainButton__body">
      <Button onClick={onClickAdmin}>Админ</Button>
      <Button onClick={onClickOperator}>Оператор</Button>
      <Button onClick={onClickCashier}>Кассир</Button>
    </div>
  );
};

export default MainButton;
