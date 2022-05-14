import { Role } from '@prisma/client';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useBank } from '../hooks/useBank';
import { employeeAPI } from '../service/employeeService';
import { isVatification } from '../utils/varification';

const NotFound = () => {
  const { data: Bank } = useBank();
  const id = localStorage.getItem('user') || '';
  if (id === '') return <Navigate to="/login" />;
  const { data: employee } = employeeAPI.useGetByIdQuery(id);
  if (employee && employee.departmentId === Bank?.id) {
    return <Navigate to="/main" />;
  } else if (employee && isVatification(employee.role, Role.ADMIN)) {
    return <Navigate to="/admin" />;
  } else if (employee && isVatification(employee.role, Role.CASHIER)) {
    return <Navigate to="/cashier" />;
  } else if (employee && isVatification(employee.role, Role.OPERATOR)) {
    return <Navigate to="/operator" />;
  } else {
    return null;
  }
  return null;
};

export default NotFound;
