import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./api/authSlice";
import { teamSlice } from "./api/teamSlice";
import { modalTeamSlice } from "./slices/modalTeamSlice";

export const store = configureStore({
  reducer: {
    modalTeamSlice: modalTeamSlice.reducer,
    [authSlice.reducerPath]: authSlice.reducer,
    [teamSlice.reducerPath]: teamSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      authSlice.middleware,
      teamSlice.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
