import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser, IUserCredentials } from "../../interfaces/user";
import { BASE_URL, EndPoints, IResponseAPI } from "../../interfaces";

export const authSlice = createApi({
  reducerPath: "authSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
  }),
  tagTypes: ["user"],
  endpoints: (builder) => ({
    signUp: builder.mutation<IResponseAPI<IUser>, Partial<IUser>>({
      query: (body) => ({
        url: `api/${EndPoints.signUp}`,
        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body,
      }),
      // end query
      invalidatesTags: ["user"],
    }),
    // end signUp

    signIn: builder.mutation<IResponseAPI<IUser>, IUserCredentials>({
      query: (userCredentials) => ({
        url: `api/${EndPoints.signIn}`,
        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: userCredentials,
      }),
      // end query
      invalidatesTags: ["user"],
    }),
    // end signIn
  }),
});

export const { useSignUpMutation, useSignInMutation } = authSlice;
