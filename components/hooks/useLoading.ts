import { useEffect, useState } from 'react';

interface UseLoadingOptions {
  initialDelay?: number;
  minLoadingTime?: number;
}

export const useLoading = (options: UseLoadingOptions = {}) => {
  const { initialDelay = 0, minLoadingTime = 500 } = options;
  const [isLoading, setIsLoading] = useState(true);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    const timer = setTimeout(() => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);

      setTimeout(() => {
        setIsLoading(false);
      }, remainingTime);
    }, initialDelay);

    return () => clearTimeout(timer);
  }, [initialDelay, minLoadingTime, startTime]);

  const setLoading = (loading: boolean) => {
    if (!loading) {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);

      setTimeout(() => {
        setIsLoading(false);
      }, remainingTime);
    } else {
      setIsLoading(true);
    }
  };

  return { isLoading, setLoading };
};

export default useLoading;
