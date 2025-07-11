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

export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
