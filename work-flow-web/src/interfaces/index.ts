interface IEndPoints {
  signUp: string;
  signIn: string;
  getTeam: string;
}

export const EndPoints: IEndPoints = {
  signUp: "Auth/signUn",
  signIn: "Auth/signIn",
  getTeam: "Team/getTeam",
};

export interface IResponseInit<T> {
  payload: T | null;
  message: string;
}
