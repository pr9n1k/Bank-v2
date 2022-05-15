import { Client } from '@prisma/client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { createClient, getDataList, queryPagination } from '@bank-v2/interface';

export const clientAPI = createApi({
  reducerPath: 'clientAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3333' }),
  tagTypes: ['Client'],
  endpoints: (build) => ({
    add: build.mutation<Client, createClient>({
      query: (client) => ({
        url: '/client/add',
        method: 'POST',
        body: client,
      }),
      invalidatesTags: ['Client'],
    }),
    get: build.query<getDataList<Client>, queryPagination | void>({
      query: (args) => ({
        url: `/client/get?limit=${args && args.limit}&page=${
          args && args.page ? parseInt(args.page) - 1 : ''
        }`,
      }),
      providesTags: ['Client'],
    }),
    getById: build.query<Client, number>({
      query: (id) => ({
        url: `/client/get/${id}`,
      }),
      providesTags: ['Client'],
    }),
    delete: build.mutation<Client, string>({
      query: (id) => ({
        url: `/client/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Client'],
    }),
  }),
});
