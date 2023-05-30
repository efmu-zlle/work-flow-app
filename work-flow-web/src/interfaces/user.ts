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

export interface IErrors {
  Email: string | string[] | Record<string, string>;
  Username: string | string[] | Record<string, string>;
  Password: string | string[] | Record<string, string>;
}
