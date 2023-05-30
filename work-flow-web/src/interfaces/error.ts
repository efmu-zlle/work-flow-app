export type RequiredError = {
  data: {
    errors: Record<string, string[]>;
    title: string;
  };
  status: number;
};

export type ValidationError = {
  data: {
    message: string;
  };
  status: number;
};

type ErrorField = {
  [index: number]: string;
};

export interface IUserError {
  Email?: ErrorField;
  Username: ErrorField;
  Password: ErrorField;
}
