import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";

interface FetchResponse<T> {
  data: T | null;
  isLoading: boolean;
  error: any;
}

function useFetch<T>(
  url: string,
  options?: AxiosRequestConfig
): FetchResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchData() {
    setIsLoading(true);
    try {
      const response = await axios(url, options);
      // setData(response);
    } catch (error) {
      // setError(error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
    return () => {};
  }, [url, options]);

  return { data, isLoading, error };
}

export default useFetch;
