import { useEffect, useState, Dispatch, useContext } from "react";
import { Action, IHttpRequest, IResponseInit } from "../interfaces";
import { useNavigate } from "react-router-dom";
import { FetchContext } from "../context/FetchProvider";

const BASE_URL = "https://localhost:5001";

function useFetch<T = any>(
  initialRequest?: IHttpRequest
): [IResponseInit<T>, (request: IHttpRequest) => void, Dispatch<Action<T>>] {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(FetchContext);
  const [config, setConfig] = useState<IHttpRequest | undefined>(
    initialRequest
  );

  // adding a timeeoutId to clean it up later
  let timeoutId: number | null = null;

  async function sendRequest(request: IHttpRequest) {
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
        if (!request.body) {
          dispatch({ type: "REQUEST_SUCCESS", payload: responseData });
        } else {
          dispatch({ type: "POST_SUCCESS", payload: responseData });
        }

        if (typeof request.to === "string") {
          navigate(`${request.to}`);
        }
      }

      if (response.status === 400) {
        dispatch({ type: "REQUEST_ERROR_400", payload: responseData });
        return;
      }

      if (response.status === 401) {
        dispatch({ type: "REQUEST_ERROR", payload: responseData });

        timeoutId = setTimeout(() => {
          dispatch({ type: "FINISH_ALERT" });
        }, 2000);
        return;
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
