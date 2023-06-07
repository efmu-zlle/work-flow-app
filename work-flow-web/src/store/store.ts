import { configureStore } from "@reduxjs/toolkit";
import { authService } from "../services/authService";
import { teamService } from "../services/teamService";
import { teamModalSlice } from "./slices/teamModalSlice";
import { todoService } from "../services/todoService";
import { setupListeners } from "@reduxjs/toolkit/query";
import { todoErrorSlice } from "./slices/todoErrorSlice";
import { authSlice } from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    teamModalSlice: teamModalSlice.reducer,
    todoErrorSlice: todoErrorSlice.reducer,
    authSlice: authSlice.reducer,
    [authService.reducerPath]: authService.reducer,
    [teamService.reducerPath]: teamService.reducer,
    [todoService.reducerPath]: todoService.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      authService.middleware,
      teamService.middleware,
      todoService.middleware,
    ]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
