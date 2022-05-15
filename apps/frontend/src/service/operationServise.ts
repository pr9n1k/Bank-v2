import { Operation } from '@prisma/client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import {
  createOperation,
  getDataList,
  operationConfirm,
  queryPagination,
} from '@bank-v2/interface';

export const operationAPI = createApi({
  reducerPath: 'operationAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3333' }),
  tagTypes: ['Operation', 'Account'],
  endpoints: (build) => ({
    add: build.mutation<Operation, createOperation>({
      query: (operation) => ({
        url: `operation/add`,
        method: 'POST',
        body: operation,
      }),
      invalidatesTags: ['Operation'],
    }),
    getNotConfirm: build.query<
      getDataList<Operation>,
      queryPagination & { id: number }
    >({
      query: (args) => ({
        url: `/operation/get-not-confirm/${args.id}?limit=${
          args.limit && args.limit
        }&page=${args && args.page ? parseInt(args.page) - 1 : ''}`,
      }),
      providesTags: ['Operation'],
    }),
    confirm: build.mutation<string, operationConfirm>({
      query: (args) => ({
        url: `operation/confirm`,
        method: 'Put',
        body: args,
      }),
      invalidatesTags: ['Operation', 'Account'],
    }),
  }),
});
