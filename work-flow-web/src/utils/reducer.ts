import { Action, IResponseInit } from "../interfaces";

export const reducer = (state: IResponseInit<any>, action: Action<any>) => {
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

    case "POST_SUCCESS":
      return {
        ...state,
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
        isError: false,
      };

    case "REQUEST_ERROR_400":
      return {
        ...state,
        errors: action.payload?.errors,
        isError: true,
      };

    default:
      return state;
  }
};
