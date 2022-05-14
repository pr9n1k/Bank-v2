import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import {
  createEncashment,
  encashmentResponse,
  updateEncashment,
} from '@bank-v2/interface';
import { Encashment, ValueEncashment } from '@prisma/client';

export const encashmentAPI = createApi({
  reducerPath: 'encashmentAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3333' }),
  tagTypes: ['Encashment'],
  endpoints: (build) => ({
    create: build.mutation<void, createEncashment>({
      query: (dto) => ({
        url: 'encashment/add',
        method: 'POST',
        body: dto,
      }),
      invalidatesTags: ['Encashment'],
    }),
    getCashier: build.query<encashmentResponse, string>({
      query: (id) => ({
        url: `encashment/get-cashier/${id}`,
      }),
      providesTags: ['Encashment'],
    }),
    getAdmin: build.query<Encashment[], void>({
      query: () => ({
        url: `encashment/get-admin`,
      }),
      providesTags: ['Encashment'],
    }),
    getByIdForAdmin: build.query<encashmentResponse, number>({
      query: (id) => ({
        url: `encashment/get-admin/${id}`,
      }),
      providesTags: ['Encashment'],
    }),
    isCashier: build.mutation<void, { id: number; encashmentId: number }>({
      query: (dto) => ({
        url: `encashment/isCashier`,
        method: 'PUT',
        body: { ...dto },
      }),
      invalidatesTags: ['Encashment'],
    }),
    isAdmin: build.mutation<void, { id: number }>({
      query: (dto) => ({
        url: `encashment/isAdmin`,
        method: 'PUT',
        body: { ...dto },
      }),
      invalidatesTags: ['Encashment'],
    }),
    update: build.mutation<void, updateEncashment>({
      query: (dto) => ({
        url: `encashment/update`,
        method: 'PUT',
        body: dto,
      }),
      invalidatesTags: ['Encashment'],
    }),
    remove: build.mutation<void, number>({
      query: (id) => ({
        url: `encashment/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Encashment'],
    }),
  }),
});
