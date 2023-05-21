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
    isLoading: false,
    errorHttp: null,
    messageSuccess: "",
    messageError: "",
    isSuccess: false,
    isError: false,
    showAlert: false,
    errors: null,
  });

  // adding a timeeoutId to clean it up later
  let timeoutId: number | null = null;

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

      if (response.status === 200) {
        setResponseInit((prev) => ({
          ...prev,
          data: responseData.data,
          messageSuccess: responseData.messageSuccess,
          messageError: "",
          isSuccess: true,
          showAlert: true,
          isError: false,
          errors: null,
        }));

        // here's the timeout, this will work with the alert
        timeoutId = setTimeout(() => {
          setResponseInit((prev) => ({ ...prev, showAlert: false }));
        }, 2000);
      }

      if (response.status === 400) {
        setResponseInit((prev) => ({
          ...prev,
          messageSuccess: "",
          messageError: "",
          isError: true,
          isSuccess: false,
          errors: responseData.errors,
        }));

        console.log(responseData);
      }

      if (response.status === 401) {
        setResponseInit((prev) => ({
          ...prev,
          messageSuccess: "",
          messageError: responseData.messageError,
          isError: true,
          showAlert: true,
          isSuccess: false,
          errors: null,
        }));

        timeoutId = setTimeout(() => {
          setResponseInit((prev) => ({ ...prev, showAlert: false }));
        }, 2000);
      }
    } catch (err) {
      setResponseInit((prev) => ({
        ...prev,
        errorHttp: err || "An error occurred.",
      }));
    } finally {
      setResponseInit((prev) => ({ ...prev, isLoading: false }));
    }
  }

  useEffect(() => {
    // only when there's data this will execute
    if (config) {
      console.log(config);
      sendRequest(config);
    }

    return () => {
      // here we clean it
      if (timeoutId) {
        console.log("Cleanup function executed.");
        clearTimeout(timeoutId);
      }
    };
  }, [config]);

  return [responseInit, setConfig];
}

export default useFetch;
