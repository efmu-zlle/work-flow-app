import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Team } from '../../interfaces/team';
import { TeamError } from '../../interfaces/error';

export interface TeamModalState {
  open: boolean;
  currentTeam: Team;
  isEdit: boolean;
  teamError: TeamError;
}

const initialState: TeamModalState = {
  open: false,
  currentTeam: {
    teamId: '',
    name: '',
    description: '',
    creatorId: '',
  },
  isEdit: false,
  teamError: {
    Name: {},
  },
};

export const teamModalSlice = createSlice({
  name: 'modal',
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

    setCurrentTeam: (state, action: PayloadAction<Team>) => {
      state.currentTeam = action.payload;
      state.isEdit = true;
    },

    setTeamError: (state, action: PayloadAction<TeamError>) => {
      state.teamError = action.payload;
    },

    resetEdit: (state) => {
      state.isEdit = false;
      state.currentTeam = {
        teamId: '',
        name: '',
        description: '',
        creatorId: '',
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
} = teamModalSlice.actions;
