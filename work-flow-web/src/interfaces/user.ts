export interface User {
  userId?: string;
  username: string;
  email: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserCredentials {
  username: string;
  password: string;
}
