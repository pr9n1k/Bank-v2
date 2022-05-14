import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Start from './../pages/Start';
import Main from './../pages/Main';
import Admin from '../pages/Admin';
import AdminMain from './Admin/AdminMain';
import DepartmentList from './Admin/Department/DepartmentList';
import DepartmentCreateForm from './Admin/Department/DepartmentCreateForm';
import Department from './Admin/Department/Department';
import EmployeeList from './Admin/Employee/EmployeeList';
import Employee from './Admin/Employee/Employee';
import CreateEmployee from './Admin/Employee/CreateEmployee';
import Operator from '../pages/Operator';
import OperatorMain from './Operator/OperatorMain';
import Balance from './Balance/Balance';
import ClientList from './Operator/Client/ClientList';
import CreateClient from './Operator/Client/CreateClient';
import Client from './Operator/Client/Client';
import Operation from './Operator/Operation/Operation';
import Cashier from '../pages/Cashier';
import Communal from './Cashier/Communal/Communal';
import CashierMain from './Cashier/CashierMain';
import Settings from './Admin/Settings/Index';
import Payments from './Cashier/Payments/Payments';
import NotFound from '../pages/NotFound';
import EmployeeNotWork from './Admin/Employee/EmlpoyeeNotWork';
import EncashmentCreate from './Encashment/EncashmentCreate';
import Encashment from './Encashment/Encashment';
import EncashmentConfirm from './Encashment/EncashmentConfirm';
import EncashmentList from './Encashment/EncashmentList';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="main" element={<Main />} />
      <Route path="admin" element={<Admin />}>
        <Route index element={<AdminMain />} />
        <Route path="department" element={<DepartmentList />} />
        <Route path="department/create" element={<DepartmentCreateForm />} />
        <Route path="department/:id" element={<Department />} />
        <Route path="employee" element={<EmployeeList />} />
        <Route path="employee/not-work" element={<EmployeeNotWork />} />
        <Route path="employee/:id" element={<Employee />} />
        <Route path="employee/create" element={<CreateEmployee />} />
        <Route path="encashment" element={<EncashmentList />} />
        <Route path="encashment/:id" element={<Encashment />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="operator" element={<Operator />}>
        <Route index element={<OperatorMain />} />
        <Route path="create-client" element={<CreateClient />} />
        <Route path="client" element={<ClientList />} />
        <Route path="client/:id" element={<Client />} />
        <Route path="operation" element={<Operation />} />
        <Route path="encashment" element={<EncashmentCreate />} />
        <Route path="balance" element={<Balance />} />
      </Route>
      <Route path="cashier" element={<Cashier />}>
        <Route index element={<CashierMain />} />
        <Route path="encashment" element={<EncashmentConfirm />} />
        <Route path="communal" element={<Communal />} />
        <Route path="payments" element={<Payments />} />
        <Route path="balance" element={<Balance />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/start" element={<Start />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
