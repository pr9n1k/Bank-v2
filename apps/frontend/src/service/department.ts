import { createDepartment, infoBank, updateBankInfo } from '@bank-v2/interface';
import { Department } from '@prisma/client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const departmentAPI = createApi({
  reducerPath: 'departmentAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3333' }),
  tagTypes: ['Department', 'Employee', 'Account'],
  endpoints: (build) => ({
    add: build.mutation<Department, createDepartment>({
      query: (department) => ({
        url: '/department/add',
        method: 'POST',
        body: department,
      }),
      invalidatesTags: ['Department'],
    }),
    get: build.query<Department[], void>({
      query: () => ({
        url: '/department/get',
      }),
      providesTags: ['Department', 'Employee'],
    }),
    getById: build.query<Department, number>({
      query: (id) => ({
        url: `/department/get/${id}`,
      }),
      providesTags: ['Department'],
    }),
    getBank: build.query<Department, void>({
      query: () => ({
        url: `/department/get-bank`,
      }),
      providesTags: ['Department'],
    }),
    getInfoBank: build.query<infoBank, void>({
      query: () => ({
        url: `/department/get-bank/info`,
      }),
      providesTags: ['Department'],
    }),
    getByIdEmployee: build.query<Department, number>({
      query: (id) => ({
        url: `/department/get-employee/${id}`,
      }),
      providesTags: ['Department'],
    }),
    updateBankInfo: build.mutation<void, updateBankInfo>({
      query: (dto) => ({
        url: '/department',
        method: 'PUT',
        body: dto,
      }),
      invalidatesTags: ['Department'],
    }),
    deleteById: build.mutation<Department, number>({
      query: (id) => ({
        url: `/department/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Department', 'Employee'],
    }),
  }),
});
