import { useEffect, useState } from 'react';

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useAsyncResource<T>(
  resourceFactory: () => Promise<T>,
): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let active = true;

    setState({ data: null, loading: true, error: null });

    resourceFactory()
      .then((data) => {
        if (!active) {
          return;
        }

        setState({ data, loading: false, error: null });
      })
      .catch((error: Error) => {
        if (!active) {
          return;
        }

        setState({ data: null, loading: false, error: error.message });
      });

    return () => {
      active = false;
    };
  }, [resourceFactory]);

  return state;
}
