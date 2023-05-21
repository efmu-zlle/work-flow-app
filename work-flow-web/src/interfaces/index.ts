type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type Action<T> =
  | { type: "REQUEST_START" }
  | { type: "REQUEST_SUCCESS"; payload: IResponseInit<T> }
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
  passwordHash?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface IErrors {
  Email: string;
  Username: string;
  Password: string;
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
}

export interface IRequestInit {
  method: HttpMethod;
  url: string;
  body?: any;
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
