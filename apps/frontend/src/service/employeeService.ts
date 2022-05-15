import { Employee } from '@prisma/client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import {
  createEmployee,
  getDataList,
  queryPagination,
} from '@bank-v2/interface';

export const employeeAPI = createApi({
  reducerPath: 'employeeAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3333' }),
  tagTypes: ['Employee'],
  endpoints: (build) => ({
    get: build.query<getDataList<Employee>, queryPagination | void>({
      query: (args) => ({
        url: `/employee/get?limit=${args && args.limit}&page=${
          args && args.page ? parseInt(args.page) - 1 : ''
        }`,
      }),
      providesTags: ['Employee'],
    }),
    getById: build.query<Employee, string>({
      query: (id) => ({
        url: `/employee/get/${id}`,
      }),
      providesTags: ['Employee'],
    }),
    getNotWork: build.query<getDataList<Employee>, queryPagination | void>({
      query: (args) => ({
        url: `/employee/get-not-work?limit=${args && args.limit}&page=${
          args && args.page ? parseInt(args.page) - 1 : ''
        }`,
      }),
      providesTags: ['Employee'],
    }),
    create: build.mutation<Employee, createEmployee>({
      query: (employee) => ({
        url: '/employee/add',
        method: 'POST',
        body: employee,
      }),
      invalidatesTags: ['Employee'],
    }),
    getByIdDepartment: build.query<
      getDataList<Employee>,
      queryPagination & { id: number }
    >({
      // query: (args) => ({
      //   url: `/employee/get-department/${args.id}?limit=${
      //     args && args.limit?.length ? args.limit : ''
      //   }&page=${args && args.page?.length ? parseInt(args.page) - 1 : ''}}`,
      // }),
      query: (args) => ({
        url: `/employee/get-department/${args.id}`,
      }),
      providesTags: ['Employee'],
    }),
    getByBank: build.query<getDataList<Employee>, queryPagination | void>({
      query: (args) => ({
        url: `/employee/get-bank?limit=${
          args && args.limit ? args.limit : ''
        }&page=${args && args.page ? parseInt(args.page) - 1 : ''}`,
      }),
      providesTags: ['Employee'],
    }),
    getByAdmin: build.query<Employee, void>({
      query: () => ({
        url: `/employee/get-admin`,
      }),
      providesTags: ['Employee'],
    }),
    routate: build.mutation<Employee, string>({
      query: (id) => ({
        url: `/employee/routate/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Employee'],
    }),
    update: build.mutation<Employee, Employee>({
      query: (employee) => ({
        url: `/employee`,
        method: 'PUT',
        body: employee,
      }),
      invalidatesTags: ['Employee'],
    }),
    deleteById: build.mutation<Employee, string>({
      query: (id) => ({
        url: `/employee/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Employee'],
    }),
  }),
});
