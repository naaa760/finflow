import axios from "axios";

const getBaseUrl = () => {
  if (process.env.NODE_ENV === "production") {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  return "http://localhost:5000";
};

export const api = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add auth token to requests
api.interceptors.request.use(async (config) => {
  if (typeof window !== "undefined") {
    const token = await window.Clerk?.session?.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      window.location.href = "/";
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
