import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface IRequestConfig extends AxiosRequestConfig {
  url: string;
}

interface IResponse<T> {
  data: T | null;
  isLoading: boolean;
  error: any;
}

interface IAxiosProps<T> {
  initialConfig?: IRequestConfig;
  initialData?: T;
}

function useAxios<T = any>({
  initialConfig,
  initialData,
}: IAxiosProps<T>): [
  IResponse<T>,
  (config: IRequestConfig) => void,
  () => void
] {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any | null>(null);
  const [config, setConfig] = useState<IRequestConfig | undefined>(
    initialConfig
  );

  async function sendRequest(requestConfig: IRequestConfig) {
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

export default useAxios;
