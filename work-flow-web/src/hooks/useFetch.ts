import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { IAxiosProps, IResponse } from "../interfaces";

function useAxios<T = any>({
  initialConfig,
  initialData,
}: IAxiosProps<T>): [
  IResponse<T>,
  (config: AxiosRequestConfig) => void,
  () => void
] {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any | null>(null);
  const [config, setConfig] = useState<AxiosRequestConfig | undefined>(
    initialConfig
  );

  async function sendRequest(requestConfig: AxiosRequestConfig) {
    setIsLoading(true);
    try {
      const response: AxiosResponse<T> = await axios(requestConfig);
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (config) {
      sendRequest(config);
    }
  }, [config]);

  function reset() {
    setData(initialData || null);
    setError(null);
    setIsLoading(false);
  }

  return [{ data, isLoading, error }, setConfig, reset];
}

axios.defaults.baseURL = "https://localhost:5001";

export default useAxios;
