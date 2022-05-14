import { Operation } from '@prisma/client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { createOperation, operationConfirm } from '@bank-v2/interface';

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
    getNotConfirm: build.query<Operation[], number>({
      query: (args) => ({
        url: `/operation/get-not-confirm/${args}`,
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
    // addCommunal: build.mutation<Communal,Communal>({
    //     query: (communal) => ({
    //         url: '/operation/communal',
    //         method: 'POST',
    //         body: communal
    //     }),
    //     invalidatesTags:['Communal','Account']
    // }),
    // addEncashment: build.mutation<Encashment,Encashment>({
    //     query: (encashment) => ({
    //         url: 'operation/encashment',
    //         method: 'POST',
    //         body: encashment
    //     }),
    //     invalidatesTags:['Encashment']
    // }),
    // getByIdEncashment: build.query<Encashment,string>({
    //     query: (id) => ({
    //         url: `operation/encashment/${id}`
    //     }),
    //     providesTags:['Encashment']
    // }),
    // getAdmin: build.query<Encashment[],void>({
    //     query: _ => ({
    //         url: 'operation/encashment-admin'
    //     }),
    //     providesTags:['Encashment']
    // }),
    // getCashier: build.query<Encashment[],void>({
    //     query: _ => ({
    //         url: 'operation/encashment-cashier'
    //     }),
    //     providesTags:['Encashment']
    // })
  }),
});
