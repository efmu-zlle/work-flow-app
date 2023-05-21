type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface IUser {
  userId?: string;
  username: string;
  email?: string;
  password: string;
  passwordHash?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface IRequired {
  Email: string;
  Username: string;
  Password: string;
}

export interface IResponseInit<T> {
  data: T | null;
  isLoading: boolean;
  errorHttp: any;
  messageSuccess: string | null;
  messageError: string | null;
  isSuccess: boolean;
  isError: boolean;
  showAlert: boolean;
  errors?: IRequired | null;
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
