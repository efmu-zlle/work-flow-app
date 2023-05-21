import { Reducer } from "react";
import { Action, IResponseInit } from "../interfaces";

export const reducer: Reducer<IResponseInit<any>, Action<any>> = (
  state,
  action
) => {
  switch (action.type) {
    case "REQUEST_START":
      return {
        ...state,
        isLoading: true,
      };

    case "REQUEST_SUCCESS":
      return {
        ...state,
        data: action.payload.data,
        isSuccess: action.payload.isSuccess,
        message: action.payload.message,
        showAlert: true,
        isError: false,
      };

    case "REQUEST_ERROR":
      return {
        ...state,
        message: action.payload.message,
        isError: action.payload.isError,
        showAlert: true,
        isSuccess: false,
      };

    case "REQUEST_FAILURE":
      return {
        ...state,
        exception: action.payload,
      };

    case "FINISH_ALERT":
      return {
        ...state,
        showAlert: false,
      };

    case "REQUEST_FINISH":
      return {
        ...state,
        isLoading: false,
      };

    case "UPDATE_USER_DATA":
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
      };

    default:
      return state;
  }
};
