import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EndPoints, IResponseAPI } from "../../interfaces";
import { ITeam } from "../../interfaces/team";

export const teamSlice = createApi({
  reducerPath: "teamSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:5001/",
  }),
  tagTypes: ["teams"],
  endpoints: (builder) => ({
    getTeams: builder.query<IResponseAPI<ITeam[]>, string>({
      query: (id) => `api/${EndPoints.getTeamById}/${id}`,
      providesTags: ["teams"],
    }),
    // end getTeams

    createTeam: builder.mutation({
      query: (body) => ({
        url: `api/${EndPoints.createTeam}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body,
      }),
      // end query
      invalidatesTags: ["teams"],
    }),
    // end createTeam
  }),
});

export const { useGetTeamsQuery, useCreateTeamMutation } = teamSlice;
