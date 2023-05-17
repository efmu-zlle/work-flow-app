import { useEffect, useState } from "react";
import { IRequest, IResponse } from "../interfaces";

const BASE_URL = "https://localhost:5001";

function useFetch<T = any>(
  initialRequest?: IRequest
): [IResponse<T>, (request: IRequest) => void] {
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
      const responseSever = await fetch(`${BASE_URL}/api${request.url}`, {
        method: request.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: request.body ? JSON.stringify(request.body) : undefined,
      });

      const responseData: IResponse<T> = await responseSever.json();

      setResponse((prevResponse) => ({
        ...prevResponse,
        data: responseData.data,
        messageSuccess: responseData.messageSuccess,
      }));

      if (responseSever.status === 400) {
        setResponse((prevResponse) => ({
          ...prevResponse,
          messageError: responseData.messageError,
        }));
        return;
      }
    } catch (err) {
      setResponse((prevResponse) => ({
        ...prevResponse,
        error: err,
      }));
    } finally {
      setResponse((prevResponse) => ({
        ...prevResponse,
        isLoading: false,
      }));
    }
  }

  useEffect(() => {
    if (initialRequest) {
      sendRequest(initialRequest);
    }
  }, [initialRequest?.url]);

  return [response, sendRequest];
}

export default useFetch;
