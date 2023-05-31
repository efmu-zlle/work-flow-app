interface IEndPoints {
  signUp: string;
  signIn: string;
  getTeam: string;
}

export const EndPoints: IEndPoints = {
  signUp: "Auth/signUp",
  signIn: "Auth/signIn",
  getTeam: "Team/getTeam",
};

export interface IResponseAPI<T> {
  payload: T | null;
  message: string;
}
