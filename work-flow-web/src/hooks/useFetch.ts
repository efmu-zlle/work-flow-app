import { useEffect, useReducer, useState, Reducer, Dispatch } from "react";
import { Action, IRequestInit, IResponseInit } from "../interfaces";
import { reducer } from "../utils/reducer";
import { initialState } from "../utils/initialState";

const BASE_URL = "https://localhost:5001";

function useFetch<T = any>(
  initialRequest?: IRequestInit
): [IResponseInit<T>, (request: IRequestInit) => void, Dispatch<Action<T>>] {
  const [config, setConfig] = useState<IRequestInit | undefined>(
    initialRequest
  );

  const [state, dispatch] = useReducer<Reducer<IResponseInit<T>, Action<T>>>(
    reducer,
    initialState
  );
  // adding a timeeoutId to clean it up later
  let timeoutId: number | null = null;

  async function sendRequest(request: IRequestInit) {
    dispatch({ type: "REQUEST_START" });

    try {
      const response = await fetch(`${BASE_URL}/api${request.url}`, {
        method: request.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: request.body ? JSON.stringify(request.body) : undefined,
      });

      const responseData: IResponseInit<T> = await response.json();

      if (response.status === 200) {
        dispatch({ type: "REQUEST_SUCCESS", payload: responseData });

        // here's the timeout, this will work with the alert
        timeoutId = setTimeout(() => {
          dispatch({ type: "FINISH_ALERT" });
        }, 2000);
      }

      if (response.status === 400) {
        dispatch({ type: "REQUEST_ERROR_400", payload: responseData });
      }

      if (response.status === 401) {
        dispatch({ type: "REQUEST_ERROR", payload: responseData });

        timeoutId = setTimeout(() => {
          dispatch({ type: "FINISH_ALERT" });
        }, 2000);
      }
    } catch (err) {
      dispatch({
        type: "REQUEST_FAILURE",
        payload: err || "An error occurred.",
      });
    } finally {
      dispatch({ type: "REQUEST_FINISH" });
    }
  }

  useEffect(() => {
    // only when there's data this will execute
    if (config) {
      sendRequest(config);
    }

    return () => {
      // here we clean it
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [config]);

  return [state, setConfig, dispatch];
}

export default useFetch;
