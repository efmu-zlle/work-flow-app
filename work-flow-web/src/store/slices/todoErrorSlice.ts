import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITodoError } from "../../interfaces/error";

export interface TodoState {
  todoError: ITodoError;
}

const initialState: TodoState = {
  todoError: {
    Title: {},
  },
};

export const todoErrorSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setTodoError: (state, action: PayloadAction<ITodoError>) => {
      state.todoError = action.payload;
    },

    reset: (state) => {
      state.todoError.Title = {};
    },
  },
});

export const { setTodoError, reset } = todoErrorSlice.actions;
