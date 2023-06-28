import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Team } from '../interfaces/team';
import { BASE_URL, EndPoints, ResponseAPI } from '../interfaces';

export const teamService = createApi({
  reducerPath: 'teamService',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
  }),
  tagTypes: ['team'],
  endpoints: (builder) => ({
    getTeams: builder.query<ResponseAPI<Team[]>, string>({
      query: (id) => `api/${EndPoints.getTeamById}/${id}`,
      providesTags: ['team'],
    }),
    // end getTeams

    createTeam: builder.mutation<ResponseAPI<Team>, Partial<Team>>({
      query: (body) => ({
        url: `api/${EndPoints.createTeam}`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body,
      }),
      // end query
      invalidatesTags: ['team'],
    }),
    // end createTeam

    updateTeam: builder.mutation<ResponseAPI<Team>, Partial<Team>>({
      query: (team) => ({
        url: `api/${EndPoints.updateTeam}`,
        method: 'PUT',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: team,
      }),
      // end query
      invalidatesTags: ['team'],
    }),
    // end updateTeam

    deleteTeam: builder.mutation<ResponseAPI<Team>, string>({
      query: (id) => ({
        url: `api/${EndPoints.deleteTeamById}/${id}`,
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      }),
      // end query
      invalidatesTags: ['team'],
    }),
    // end deleteTeam
  }),
});

export const {
  useGetTeamsQuery,
  useCreateTeamMutation,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
} = teamService;
