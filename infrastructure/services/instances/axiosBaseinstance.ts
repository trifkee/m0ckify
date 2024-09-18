import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const axiosBaseInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosBaseInstance.interceptors.request.use(
  async function (config) {
    const tokenFromStorage = JSON.parse(localStorage.getItem("token")!);

    if (!config.headers["Authorization"]) {
      config.headers["Authorization"] = "Bearer " + tokenFromStorage;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosBaseInstance.interceptors.response.use(
  async (response) => {
    return response;
  },

  async (error) => {
    if (error.response.status === 401 && localStorage.getItem("token")) {
      window.dispatchEvent(new Event("logout"));
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);
