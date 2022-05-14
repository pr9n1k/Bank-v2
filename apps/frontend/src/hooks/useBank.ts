import { departmentAPI } from './../service/department';

export const useBank = () => {
  const { data, isLoading, error } = departmentAPI.useGetBankQuery();
  return {
    data,
    isLoading,
    error,
  };
};
