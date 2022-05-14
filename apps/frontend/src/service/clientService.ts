import { Client } from '@prisma/client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { createClient } from '@bank-v2/interface';

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
    get: build.query<
      {
        client: Client[];
        total: number;
      },
      {
        limit: number;
        page: number;
      }
    >({
      query: (args = { limit: -1, page: 1 }) => ({
        url: `/client/get?limit=${args.limit}&page=${args.page - 1}`,
      }),
      //   transformResponse(response: Client[], meta) {
      //     return {
      //       client: response,
      //       number: Number(meta?.response?.headers.get('X-Total-Count')),
      //     };
      //   },
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
