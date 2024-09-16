import axios from "axios";

const baseURL = "https://m0ckify-be.vercel.app";

export const axiosBaseInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosBaseInstance.interceptors.response.use(
  async function (response) {
    return response;
  },
  async function (error) {
    return Promise.reject(error);
  }
);
