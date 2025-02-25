import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL?.trim(),
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add request interceptor
api.interceptors.request.use(async (config) => {
  try {
    if (typeof window !== "undefined") {
      const token = await window.Clerk?.session?.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  } catch (error) {
    console.error("Error getting auth token:", error);
    return config;
  }
});

// Add response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    return Promise.reject(error);
  }
);

export const fetchApi = async <T>(
  endpoint: string,
  options = {}
): Promise<T> => {
  const response = await api.get(endpoint, options);
  return response.data;
};

export { api };
