import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add auth token to requests
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

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    if (error.response?.status === 401) {
      window.location.href = "/sign-in";
    }
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
