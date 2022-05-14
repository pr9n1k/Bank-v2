import { Employee } from '@prisma/client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { createEmployee } from '@bank-v2/interface';

export const employeeAPI = createApi({
  reducerPath: 'employeeAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3333' }),
  tagTypes: ['Employee'],
  endpoints: (build) => ({
    get: build.query<
      {
        employee: Employee[];
        total: number;
      },
      {
        limit?: number;
        page: number;
      }
    >({
      query: (args = { limit: 0, page: 1 }) => ({
        url: `/employee/get?limit=${args.limit}&page=${args.page - 1}`,
      }),
      providesTags: ['Employee'],
    }),
    getById: build.query<Employee, string>({
      query: (id) => ({
        url: `/employee/get/${id}`,
      }),
      providesTags: ['Employee'],
    }),
    getNotWork: build.query<Employee[], void>({
      query: () => ({
        url: `/employee/get-not-work`,
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
    getByIdDepartment: build.query<Employee[], string>({
      query: (id) => ({
        url: `/employee/get-department/${id}`,
      }),
      providesTags: ['Employee'],
    }),
    getByBank: build.query<Employee[], void>({
      query: () => ({
        url: `/employee/get-bank`,
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
