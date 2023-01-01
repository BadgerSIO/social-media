import axios from "axios";

export const API = axios.create({
  baseURL: "https://social-media-server-nu.vercel.app",
});
export default API;
