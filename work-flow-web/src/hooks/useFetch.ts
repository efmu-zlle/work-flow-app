import { Dispatch, useContext, useEffect, useState } from "react";
import { Action, IHttpRequest, IResponseInit } from "../interfaces";
import { FetchContext } from "../context/FetchProvider";

const BASE_URL = "https://localhost:5001";

export default function useFetch<T = any>(
  initialRequest?: IHttpRequest
): [IResponseInit<T>, (settings: IHttpRequest) => void, Dispatch<Action<T>>] {
  const { state, dispatch } = useContext(FetchContext);
  const [settings, setSettings] = useState<IHttpRequest | undefined>(
    initialRequest
  );

  async function makeRequest(request: IHttpRequest) {
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

      if (response.ok) {
        if (!request.body) {
          dispatch({ type: "REQUEST_SUCCESS", payload: responseData });
        } else {
          dispatch({ type: "POST_SUCCESS", payload: responseData });
        }
      }

      if (response.status === 400) {
        dispatch({ type: "REQUEST_ERROR_400", payload: responseData });
      }

      if (response.status === 401) {
        dispatch({ type: "REQUEST_ERROR", payload: responseData });
      }
    } catch (err) {
      dispatch({
        type: "REQUEST_FAILURE",
        payload: err || "An error occurred",
      });
    } finally {
      dispatch({ type: "REQUEST_FINISH" });
    }
  }

  useEffect(() => {
    if (settings) {
      makeRequest(settings);
    }
  }, [settings]);

  return [state, setSettings, dispatch];
}
