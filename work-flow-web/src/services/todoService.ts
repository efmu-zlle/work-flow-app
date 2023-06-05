import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, EndPoints, IResponseAPI } from "../interfaces";
import { ITodo } from "../interfaces/todo";

export const todoService = createApi({
  reducerPath: "todoService",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  tagTypes: ["todo"],
  endpoints: (builder) => ({
    getTodosByTeamId: builder.query<IResponseAPI<ITodo[]>, string>({
      query: (teamId) => `api/${EndPoints.getTodosByTeamId}/${teamId}`,
      providesTags: [{ type: "todo", id: "LIST" }],
    }),

    createTodo: builder.mutation<IResponseAPI<ITodo>, Partial<ITodo>>({
      query: (todo) => ({
        url: `api/${EndPoints.createTodo}`,
        method: "POST",
        body: todo,
      }),
      // end query
      invalidatesTags: [{ type: "todo", id: "LIST" }],
      //add an optimics fetch
    }),
    // end createTodo

    updateTodo: builder.mutation<IResponseAPI<ITodo>, Partial<ITodo>>({
      query: (todo) => ({
        url: `api/${EndPoints.updateTodo}/${todo.todoId}`,
        method: "PUT",
        body: todo,
      }),
      // end query
    }),
    // end updateTodo

    deleteTodo: builder.mutation<IResponseAPI<ITodo>, ITodo>({
      query: (todo) => ({
        url: `api/${EndPoints.deleteTodo}/${todo.todoId}`,
        method: "DELETE",
      }),
      // end query
      invalidatesTags: [{ type: "todo", id: "LIST" }],
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
