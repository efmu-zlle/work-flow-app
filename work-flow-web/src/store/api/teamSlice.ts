import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, EndPoints, IResponseAPI } from "../../interfaces";
import { ITeam } from "../../interfaces/team";

export const teamSlice = createApi({
  reducerPath: "teamSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
  }),
  tagTypes: ["team"],
  endpoints: (builder) => ({
    getTeams: builder.query<IResponseAPI<ITeam[]>, string>({
      query: (id) => `api/${EndPoints.getTeamById}/${id}`,
      providesTags: ["team"],
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
      invalidatesTags: ["team"],
    }),
    // end createTeam

    updateTeam: builder.mutation<IResponseAPI<ITeam>, Partial<ITeam>>({
      query: (team) => ({
        url: `api/${EndPoints.updateTeam}`,
        method: "PUT",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: team,
      }),
      // end query
      invalidatesTags: ["team"],
    }),
    // end updateTeam

    deleteTeam: builder.mutation<IResponseAPI<ITeam>, string>({
      query: (id) => ({
        url: `api/${EndPoints.deleteTeamById}/${id}`,
        method: "DELETE",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
      }),
      // end query
      invalidatesTags: ["team"],
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
