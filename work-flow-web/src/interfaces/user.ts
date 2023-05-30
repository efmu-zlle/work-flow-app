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

export interface IUserErrors {
  Email?: string;
  Username: string;
  Password: string;
}

export interface IErrors {
  errors: IUserErrors;
  title: string;
  message: string;
}
