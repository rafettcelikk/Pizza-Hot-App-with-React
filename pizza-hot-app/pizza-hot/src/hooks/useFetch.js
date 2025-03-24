import { useState, useEffect, useCallback } from "react";

export function useFetch(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      try {
        const response = await fetch(url, { ...config, body: data });
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message || "Bir hata oluştu!");
        }
        setData(responseData);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if (config && config.method === "GET") {
      sendRequest();
    }
  }, [sendRequest, config]);

  return { data, error, isLoading, sendRequest };
}
