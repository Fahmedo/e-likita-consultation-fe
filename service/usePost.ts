import { useState, useCallback } from 'react';
import { type AxiosRequestConfig, type AxiosResponse } from 'axios';
import API from './axios';

export default function usePost<TResponse = any, TRequest = any>(
  url: string,
  method: string
) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<TResponse | null>(null);

  const makeRequest = useCallback(
    async (requestData: TRequest, config?: AxiosRequestConfig) => {
      setIsLoading(true);
      setIsSuccess(false);
      setError(null);
      try {
        const response: AxiosResponse<TResponse> = await API({
          url,
          method: method,
          data: requestData,
          ...config, // allows overriding headers, params, etc.
        });
        if (response.status >= 200 && response.status < 300) {
          setIsSuccess(true);
        }
        setData(response.data);
        return response.data;
      } catch (err) {
        const errorObj =
          err instanceof Error ? err : new Error('An error occurred');
        setError(errorObj);
        throw errorObj; // so the caller can also catch
      } finally {
        setIsLoading(false);
      }
    },
    [url]
  );

  return { makeRequest, data, isLoading, error, isSuccess };
}
