import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  open: boolean;
  isEdit: boolean;
}

const initialState: CounterState = {
  open: false,
  isEdit: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<boolean>) => {
      state.open = true;
      state.isEdit = action.payload;
    },
    closeModal: (state) => {
      state.open = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openModal, closeModal } = modalSlice.actions;
