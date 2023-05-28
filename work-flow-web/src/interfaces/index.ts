type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type Action<T> =
  | { type: "REQUEST_START" }
  | { type: "REQUEST_SUCCESS"; payload: IResponseInit<T> }
  | { type: "POST_SUCCESS"; payload: IResponseInit<T> }
  | { type: "REQUEST_ERROR"; payload: IResponseInit<T> }
  | { type: "REQUEST_FAILURE"; payload: any }
  | { type: "UPDATE_USER_DATA"; payload: Partial<T> }
  | { type: "REQUEST_ERROR_400"; payload: IResponseInit<T> }
  | { type: "FINISH_ALERT" }
  | { type: "REQUEST_FINISH" };

export interface IUser {
  userId?: string;
  username: string;
  email?: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ITeam {
  teamId: string;
  name: string;
  description: string;
  creatorId: string;
  code: string;
  createdAt?: string;
  updatedAt?: string;
}

interface IErrors {
  Email: string | string[] | Record<string, string>;
  Username: string | string[] | Record<string, string>;
  Password: string | string[] | Record<string, string>;
}

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

export interface IHttpRequest {
  method: HttpMethod;
  url: string;
  body?: any;
  to?: string | null;
}

interface IEndPoints {
  signup: string;
  signin: string;
}

export const EndPoints: IEndPoints = {
  signup: "/Auth/signup",
  signin: "/Auth/signin",
};
