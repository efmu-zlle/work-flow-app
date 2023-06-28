import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, EndPoints, ResponseAPI } from '../interfaces';
import { Todo } from '../interfaces/todo';

export const todoService = createApi({
  reducerPath: 'todoService',
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  tagTypes: ['todo'],
  endpoints: (builder) => ({
    getTodosByTeamId: builder.query<ResponseAPI<Todo[]>, string>({
      query: (teamId) => `api/${EndPoints.getTodosByTeamId}/${teamId}`,
      providesTags: [{ type: 'todo', id: 'LIST' }],
    }),

    createTodo: builder.mutation<ResponseAPI<Todo>, Partial<Todo>>({
      query: (todo) => ({
        url: `api/${EndPoints.createTodo}`,
        method: 'POST',
        body: todo,
      }),
      // end query
      async onQueryStarted(todo, { queryFulfilled, dispatch }) {
        const { data: response } = await queryFulfilled;
        const patchResult = dispatch(
          todoService.util.updateQueryData(
            'getTodosByTeamId',
            todo.teamId || '',
            (draft) => {
              draft.payload.push(response.payload);
            }
          )
        );
        queryFulfilled.catch(patchResult.undo);
      },
    }),
    // end createTodo

    updateTodo: builder.mutation<ResponseAPI<Todo>, Partial<Todo>>({
      query: (todo) => ({
        url: `api/${EndPoints.updateTodo}/${todo.todoId}`,
        method: 'PUT',
        body: todo,
      }),
      // end query
    }),
    // end updateTodo

    deleteTodo: builder.mutation<ResponseAPI<Todo>, Todo>({
      query: (todo) => ({
        url: `api/${EndPoints.deleteTodo}/${todo.todoId}`,
        method: 'DELETE',
      }),
      // end query
      invalidatesTags: [{ type: 'todo', id: 'LIST' }],
    }),
    // end deleteTodo
  }),
});

export const {
  useGetTodosByTeamIdQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoService;
