import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, EndPoints, IResponseAPI } from "../../interfaces";
import { ITodo } from "../../interfaces/todo";

export const todoSlice = createApi({
  reducerPath: "todoSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
  }),
  tagTypes: ["todo"],
  endpoints: (builder) => ({
    getTodoById: builder.query<IResponseAPI<ITodo[]>, string>({
      query: (id) => `api/${EndPoints.getTodoById}/${id}`,
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
    }),
    // end createTodo

    updateTodo: builder.mutation<
      IResponseAPI<ITodo>,
      Pick<ITodo, "todoId"> & Partial<ITodo>
    >({
      query: ({ todoId, ...patch }) => ({
        url: `api/${EndPoints.updateTodo}/${todoId}`,
        method: "PUT",
        body: patch,
      }),
      // end query
      invalidatesTags: [{ type: "todo", id: "LIST" }],
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
  useGetTodoByIdQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoSlice;