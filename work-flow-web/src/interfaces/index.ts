export const BASE_URL = "https://localhost:5001/";

interface IEndPoints {
  signUp: string;
  signIn: string;
  getTeamById: string;
  createTeam: string;
  updateTeam: string;
  deleteTeamById: string;
}

export const EndPoints: IEndPoints = {
  signUp: "Auth/signUp",
  signIn: "Auth/signIn",
  getTeamById: "Team/getTeam",
  createTeam: "Team/createTeam",
  updateTeam: "Team/updateTeam",
  deleteTeamById: "Team/deleteTeam",
};

export interface IResponseAPI<T> {
  payload: T | null;
  message: string;
}
