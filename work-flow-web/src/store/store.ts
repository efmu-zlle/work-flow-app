import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./api/authSlice";
import { teamSlice } from "./api/teamSlice";
import { teamModalSlice } from "./slices/teamModalSlice";
import { todoSlice } from "./api/todoSlice";

export const store = configureStore({
  reducer: {
    teamModalSlice: teamModalSlice.reducer,
    [authSlice.reducerPath]: authSlice.reducer,
    [teamSlice.reducerPath]: teamSlice.reducer,
    [todoSlice.reducerPath]: todoSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      authSlice.middleware,
      teamSlice.middleware,
      todoSlice.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
