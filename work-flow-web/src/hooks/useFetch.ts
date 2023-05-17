import { useEffect, useState } from "react";
import { IRequest, IResponse } from "../interfaces";

const BASE_URL = "https://localhost:5001";

function useFetch<T = any>(
  initialRequest?: IRequest
): [IResponse<T>, (request: IRequest) => void] {
  const [config, setConfig] = useState<IRequest | undefined>(initialRequest);
  const [response, setResponse] = useState<IResponse<T>>({
    data: null,
    isLoading: false,
    messageSuccess: null,
    messageError: null,
    error: null,
  });

  async function sendRequest(request: IRequest) {
    setResponse((prevResponse) => ({
      ...prevResponse,
      isLoading: true,
    }));

    try {
      const responseServer = await fetch(`${BASE_URL}/api${request.url}`, {
        method: request.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: request.body ? JSON.stringify(request.body) : undefined,
      });

      const responseData: IResponse<T> = await responseServer.json();

      setResponse((prevResponse) => ({
        ...prevResponse,
        data: responseData.data,
        messageSuccess: responseData.messageSuccess,
      }));

      if (responseServer.status === 400) {
        setResponse((prevResponse) => ({
          ...prevResponse,
          messageError: responseData.messageError,
        }));
        return;
      }
    } catch (err) {
      setResponse((prevResponse) => ({
        ...prevResponse,
        error: err || "An error occurred.",
      }));
    } finally {
      setResponse((prevResponse) => ({
        ...prevResponse,
        isLoading: false,
      }));
    }
  }

  useEffect(() => {
    if (config) {
      sendRequest(config);
    }
  }, [config]);

  return [response, setConfig];
}

export default useFetch;
