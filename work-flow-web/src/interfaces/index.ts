export interface IUser {
  userId?: string;
  username: string;
  email?: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IUserCredentials {
  username: string;
  password: string;
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
