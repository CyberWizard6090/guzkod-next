export const fetchApi = async (url: string, options?: RequestInit) => {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
};

type FetchResult<T> = {
  data: T | null;
  error: Error | null;
  loading: boolean;
};

export const fetchApiWithState = async <T>(
  url: string,
  options?: RequestInit,
): Promise<FetchResult<T>> => {
  const result: FetchResult<T> = {
    data: null,
    error: null,
    loading: true,
  };

  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

    result.data = (await res.json()) as T;
  } catch (err) {
    result.error = err as Error;
  } finally {
    result.loading = false;
  }

  return result;
};

export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
