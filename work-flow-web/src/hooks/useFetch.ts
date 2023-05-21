import { useEffect, useState } from "react";
import { IRequestInit, IResponseInit } from "../interfaces";

const BASE_URL = "https://localhost:5001";

function useFetch<T = any>(
  initialRequest?: IRequestInit
): [IResponseInit<T>, (request: IRequestInit) => void] {
  const [config, setConfig] = useState<IRequestInit | undefined>(
    initialRequest
  );
  const [responseInit, setResponseInit] = useState<IResponseInit<T>>({
    data: null,
    payload: null,
    isLoading: false,
    messageSuccess: null,
    messageError: null,
    error: null,
  });

  async function sendRequest(request: IRequestInit) {
    setResponseInit((prev) => ({ ...prev, isLoading: true }));

    try {
      const response = await fetch(`${BASE_URL}/api${request.url}`, {
        method: request.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: request.body ? JSON.stringify(request.body) : undefined,
      });

      const responseData: IResponseInit<T> = await response.json();

      setResponseInit((prev) => ({
        ...prev,
        data: responseData.data,
        messageSuccess: responseData.messageSuccess,
      }));

      if (response.status === 400) {
        setResponseInit((prev) => ({
          ...prev,
          messageError: responseData.messageError,
        }));
        return;
      }
    } catch (err) {
      setResponseInit((prev) => ({
        ...prev,
        error: err || "An error occurred.",
      }));
    } finally {
      setResponseInit((prev) => ({ ...prev, isLoading: false }));
    }
  }

  useEffect(() => {
    if (config) {
      sendRequest(config);
    }
  }, [config]);

  return [responseInit, setConfig];
}

export default useFetch;
