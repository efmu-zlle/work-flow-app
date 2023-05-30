import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser, IUserCredentials } from "../../interfaces/user";
import { EndPoints } from "../../interfaces";

export const authSlice = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:5001/",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    signUp: builder.mutation<IUser, Partial<IUser>>({
      query: (body) => ({
        url: `api/${EndPoints.signUp}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body,
      }),
      // end query
      invalidatesTags: ["User"],
    }),
    // end signUp

    signIn: builder.mutation<IUser, IUserCredentials>({
      query: (userCredentials) => ({
        url: `api/${EndPoints.signIn}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: userCredentials,
      }),
      // end query
      invalidatesTags: ["User"],
    }),
    // end signIn
  }),
});

export const { useSignUpMutation, useSignInMutation } = authSlice;
