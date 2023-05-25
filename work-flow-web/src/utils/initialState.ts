import { IResponseInit } from "../interfaces";

export const initialState: IResponseInit<any> = {
  data: {},
  message: "",
  isSuccess: false,
  isError: false,
  isLoading: false,
  showAlert: false,
  exception: null,
  errors: null,
  currentUser: localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser")!)
    : null,
};
