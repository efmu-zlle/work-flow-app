import { AxiosRequestConfig } from "axios";

export interface IUser {
  userId?: string;
  username: string;
  email?: string;
  password: string;
  passwordHash?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IResponse<T> {
  data: T | null;
  isLoading: boolean;
  error: any;
}

export interface IAxiosProps<T> {
  initialConfig?: AxiosRequestConfig;
  initialData?: T;
}

interface IEndPoints {
  test: string;
  signup: string;
  signin: string;
}

export const EndPoints: IEndPoints = {
  test: "/Auth/test",
  signup: "/Auth/signup",
  signin: "/Auth/signin",
};
