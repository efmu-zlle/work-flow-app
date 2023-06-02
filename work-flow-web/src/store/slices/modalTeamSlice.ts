import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITeam } from "../../interfaces/team";
import { ITeamError } from "../../interfaces/error";

export interface ModalTeamState {
  open: boolean;
  currentTeam: ITeam;
  isEdit: boolean;
  teamError: ITeamError;
}

const initialState: ModalTeamState = {
  open: false,
  currentTeam: {
    teamId: "",
    name: "",
    description: "",
    creatorId: "",
  },
  isEdit: false,
  teamError: {
    Name: {},
  },
};

export const modalTeamSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.open = true;
    },

    closeModal: (state) => {
      state.open = false;
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
      state.currentTeam = {
        ...state.currentTeam,
        [name]: value,
        creatorId: userId!,
      };
    },

    setCurrentTeam: (state, action: PayloadAction<ITeam>) => {
      state.currentTeam = action.payload;
      state.isEdit = true;
    },

    setTeamError: (state, action: PayloadAction<ITeamError>) => {
      state.teamError = action.payload;
    },

    resetEdit: (state) => {
      state.isEdit = false;
      state.currentTeam = {
        teamId: "",
        name: "",
        description: "",
        creatorId: "",
      };
      state.teamError.Name = {};
    },
  },
});

export const {
  openModal,
  closeModal,
  onChangeTeam,
  setCurrentTeam,
  setTeamError,
  resetEdit,
} = modalTeamSlice.actions;
