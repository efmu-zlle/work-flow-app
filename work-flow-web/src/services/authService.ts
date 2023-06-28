import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User, UserCredentials } from '../interfaces/user';
import { BASE_URL, EndPoints, ResponseAPI } from '../interfaces';

export const authService = createApi({
  reducerPath: 'authService',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
  }),
  tagTypes: ['user'],
  endpoints: (builder) => ({
    signUp: builder.mutation<ResponseAPI<User>, Partial<User>>({
      query: (body) => ({
        url: `api/${EndPoints.signUp}`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body,
      }),
      // end query
      invalidatesTags: ['user'],
    }),
    // end signUp

    signIn: builder.mutation<ResponseAPI<User>, UserCredentials>({
      query: (userCredentials) => ({
        url: `api/${EndPoints.signIn}`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: userCredentials,
      }),
      // end query
      invalidatesTags: ['user'],
    }),
    // end signIn
  }),
});

export const { useSignUpMutation, useSignInMutation } = authService;
