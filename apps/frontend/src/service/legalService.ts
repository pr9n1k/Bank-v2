import { Legal } from '@prisma/client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { createLegal } from '@bank-v2/interface';

export const legalAPI = createApi({
  reducerPath: 'legalAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3333' }),
  tagTypes: ['Legal'],
  endpoints: (build) => ({
    add: build.mutation<Legal, createLegal>({
      query: (legal) => ({
        url: '/legal/add',
        method: 'POST',
        body: legal,
      }),
      invalidatesTags: ['Legal'],
    }),
    get: build.query<Legal[], void>({
      query: () => ({
        url: '/legal/get',
      }),
      providesTags: ['Legal'],
    }),
    getCommunal: build.query<Legal[], void>({
      query: () => ({
        url: '/legal/get-communal',
      }),
      providesTags: ['Legal'],
    }),
    // getById: build.query<Legal,string>({
    //     query: (id)=> ({
    //         url: `/legal/get/${id}`
    //     }),
    //     providesTags: ['Legal']
    // }),
    getByIdClient: build.query<Legal[], number>({
      query: (id) => ({
        url: `/legal/get-client/${id}`,
      }),
      providesTags: ['Legal'],
    }),
    remove: build.mutation<Legal, number>({
      query: (id) => ({
        url: `legal/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Legal'],
    }),
    // getCommunal: build.query<Legal[],void>({
    //     query: () => '/legal/communal',
    //     providesTags: ['Legal']
    // })
  }),
});
