import { IErrors, IUser } from "./user";

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
  data: T | null;
  message: string;
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
  exception: any;
  showAlert: boolean;
  errors?: IErrors | null;
  currentUser: IUser | null;
}
