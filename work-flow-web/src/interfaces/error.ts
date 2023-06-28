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

export interface UserError {
  Email?: ErrorField;
  Username: ErrorField;
  Password: ErrorField;
}

export interface TeamError {
  Name: ErrorField;
}

export interface TodoError {
  Title: ErrorField;
}
