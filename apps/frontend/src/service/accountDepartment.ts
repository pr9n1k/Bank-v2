import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { AccountDepartment } from '@prisma/client';
import { updateAccountsBank } from '@bank-v2/interface';

export const accountAPI = createApi({
  reducerPath: 'accountAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3333' }),
  tagTypes: ['Account'],
  endpoints: (build) => ({
    getByIdDepartment: build.query<AccountDepartment[], number>({
      query: (id) => ({
        url: `/account-department/get-department/${id}`,
      }),
      providesTags: ['Account'],
    }),
    getByIdEmployee: build.query<AccountDepartment[], number>({
      query: (id) => ({
        url: `/account-department/get-employee/${id}`,
      }),
      providesTags: ['Account'],
    }),
    updateBank: build.mutation<void, updateAccountsBank>({
      query: (dto) => ({
        url: `/account-department`,
        method: 'PUT',
        body: dto,
      }),
      invalidatesTags: ['Account'],
    }),
  }),
});
