import { IResponseInit } from "../interfaces";

export const initialState: IResponseInit<any> = {
  data: null,
  message: "",
  isSuccess: false,
  isError: false,
  isLoading: false,
  showAlert: false,
  exception: null,
  errors: null,
};
