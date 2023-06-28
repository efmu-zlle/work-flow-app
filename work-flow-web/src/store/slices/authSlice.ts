import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../interfaces/user';

interface AuthSlice {
  currentUser: User | null;
}

const storedUser = localStorage.getItem('currentUser');

const initialState: AuthSlice = {
  currentUser: storedUser ? JSON.parse(storedUser) : null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },

    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
  },
});

export const { setCurrentUser } = authSlice.actions;
