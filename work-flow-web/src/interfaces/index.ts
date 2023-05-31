interface IEndPoints {
  signUp: string;
  signIn: string;
  getTeamById: string;
  createTeam: string;
}

export const EndPoints: IEndPoints = {
  signUp: "Auth/signUp",
  signIn: "Auth/signIn",
  getTeamById: "Team",
  createTeam: "Team/createTeam",
};

export interface IResponseAPI<T> {
  payload: T | null;
  message: string;
}
