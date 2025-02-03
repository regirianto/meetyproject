import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});

export const signUp = (data) => API.post("/auth/sign-up", data);
export const signIn = (data) => API.post("/auth/sign-in", data);
