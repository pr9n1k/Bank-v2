import { Individual } from '@prisma/client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { createIndividual } from '@bank-v2/interface';

export const individualAPI = createApi({
  reducerPath: 'individualAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3333' }),
  tagTypes: ['Individual'],
  endpoints: (build) => ({
    add: build.mutation<Individual, createIndividual>({
      query: (args) => ({
        url: `individual/add`,
        method: 'POST',
        body: args,
      }),
      invalidatesTags: ['Individual'],
    }),
    // get: build.query<Individual[], string>({
    //   query: (id) => ({
    //     url: `/client/get/${id}/account`,
    //   }),
    //   providesTags: ['Account'],
    // }),
    getAll: build.query<Individual[], void>({
      query: () => ({
        url: 'individual/get',
      }),
      providesTags: ['Individual'],
    }),
    // getByNumber: build.query<Individual, string>({
    //   query: (number) => ({
    //     url: `/client/get/account/${number}`,
    //   }),
    //   providesTags: ['Account'],
    // }),
    getByClient: build.query<Individual[], number>({
      query: (id) => ({
        url: `individual/get-client/${id}`,
      }),
      providesTags: ['Individual'],
    }),
    remove: build.mutation<Individual, number>({
      query: (id) => ({
        url: `individual/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Individual'],
    }),
  }),
});
