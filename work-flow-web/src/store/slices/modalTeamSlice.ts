import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITeam } from "../../interfaces/team";

export interface ModalTeamState {
  open: boolean;
  team: ITeam;
  isEdit: boolean;
}

const initialState: ModalTeamState = {
  open: false,
  team: {
    teamId: "",
    name: "",
    description: "",
    creatorId: "",
  },
  isEdit: false,
};

export const modalTeamSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ITeam>) => {
      const { teamId } = action.payload;
      if (teamId !== "") {
        state.isEdit = true;
      } else {
        state.isEdit = false;
      }
      state.open = true;
      state.team = action.payload;
    },

    closeModal: (state) => {
      state.open = false;
      state.team = { teamId: "", name: "", description: "", creatorId: "" };
      state.isEdit = false;
    },

    onChangeTeam: (
      state,
      action: PayloadAction<{
        name: string;
        value: string;
        userId: string | undefined;
      }>
    ) => {
      const { name, value, userId } = action.payload;
      state.team = { ...state.team, [name]: value, creatorId: userId! };
    },
  },
});

// Action creators are generated for each case reducer function
export const { openModal, closeModal, onChangeTeam } = modalTeamSlice.actions;
