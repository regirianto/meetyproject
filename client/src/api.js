import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});

export const signUp = (data) => API.post("/auth/sign-up", data);
export const signIn = (data) => API.post("/auth/sign-in", data);
export const saveBaseProfile = (data) =>
  API.post("/profile/base-profile", data);
export const getInterests = () => API.get("/profile/interests");
export const saveInterestProfile = (data) =>
  API.post("/profile/activity", data);
export const uploadPhotoProfile = (data) =>
  API.post("/profile/set-photo", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
