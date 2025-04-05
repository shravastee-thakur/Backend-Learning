import axios from "axios";

// const instance = axios.create({
//   baseURL: "http://localhost:3000/api/v1/user",
//   withCredentials: true,
// });
const instance = axios.create({
  baseURL: "http://localhost:3000/api/v1/user", // or your route prefix
  withCredentials: true, // 💥 needed for sending cookies
});

export default instance;
