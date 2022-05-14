import { Communal } from '@prisma/client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { createCommunal } from '@bank-v2/interface';

export const communalAPI = createApi({
  reducerPath: 'communalAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3333' }),
  tagTypes: ['Communal'],
  endpoints: (build) => ({
    add: build.mutation<Communal, createCommunal>({
      query: (dto) => ({
        url: '/communal/add',
        method: 'POST',
        body: dto,
      }),
      invalidatesTags: ['Communal'],
    }),
  }),
});
