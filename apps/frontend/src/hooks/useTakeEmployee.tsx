import { employeeAPI } from '../service/employeeService';

export const useTakeEmployee = () => {
  const id = localStorage.getItem('user') || '';
  const { data: employee, isLoading, error } = employeeAPI.useGetByIdQuery(id);
  return {
    employee,
    isLoading,
    error,
  };
};
