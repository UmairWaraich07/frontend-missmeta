import axios from "axios";

// export default axios.create({
//   baseURL: "http://localhost:8000/api/v1",
// });

const api = axios.create({
  // baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
