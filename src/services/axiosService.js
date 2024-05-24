import axios from "axios";

const apiInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export { apiInstance as Api };

export default axios;
