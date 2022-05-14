import { Employee } from '@prisma/client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3333' }),
  endpoints: (build) => ({
    login: build.mutation<
      Employee,
      {
        login: string;
        password: string;
      }
    >({
      query: (logpass) => ({
        url: '/auth',
        method: 'POST',
        body: logpass,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const data = (await queryFulfilled).data;
          if (data.id >= 0) {
            localStorage.setItem('user', data.id.toString());
          } else {
            localStorage.setItem('user', '');
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
    // get: build.query({
    //   query: () => ({
    //     url: 'https://www.cbr-xml-daily.ru/daily_json.js',
    //   }),
    // }),
  }),
});
