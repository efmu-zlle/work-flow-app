import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, EndPoints, IResponseAPI } from "../../interfaces";
import { ITeam } from "../../interfaces/team";

export const teamSlice = createApi({
  reducerPath: "teamSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
  }),
  tagTypes: ["teams"],
  endpoints: (builder) => ({
    getTeams: builder.query<IResponseAPI<ITeam[]>, string>({
      query: (id) => `api/${EndPoints.getTeamById}/${id}`,
      providesTags: ["teams"],
    }),
    // end getTeams

    createTeam: builder.mutation<IResponseAPI<ITeam>, Partial<ITeam>>({
      query: (body) => ({
        url: `api/${EndPoints.createTeam}`,
        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body,
      }),
      // end query
      invalidatesTags: ["teams"],
    }),
    // end createTeam

    updateTeam: builder.mutation<
      IResponseAPI<ITeam>,
      { id: string; requestBody: Partial<ITeam> }
    >({
      query: ({ id, requestBody }) => ({
        url: `api/${EndPoints.updateTeam}/${id}`,
        method: "PUT",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: requestBody,
      }),
      // end query
      invalidatesTags: ["teams"],
    }),
    // end updateTeam

    deleteTeam: builder.mutation<IResponseAPI<ITeam>, string>({
      query: (id) => ({
        url: `api/${EndPoints.deleteTeamById}/${id}`,
        method: "DELETE",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
      }),
      // end query
      invalidatesTags: ["teams"],
    }),
    // end deleteTeam
  }),
});

export const {
  useGetTeamsQuery,
  useCreateTeamMutation,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
} = teamSlice;
