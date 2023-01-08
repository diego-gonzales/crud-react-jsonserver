import axios from "axios";
const apiURL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: apiURL
});

axiosInstance.interceptors.request.use(
  (request) => {
    // console.log('request', request);
    return request;
  },
  (error) => {
    // console.log('error request', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // console.log('response', response);
    return response;
  },
  (error) => {
    // console.log('error response', error);
    return Promise.reject(error);
  }
);

export const http = axiosInstance;
