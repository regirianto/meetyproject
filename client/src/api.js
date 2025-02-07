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
export const getUserProfile = (userId) =>
  API.get(`/profile/user-profile/${userId}`);
export const updateUserProfile = (userId, data) =>
  API.put(`/profile/edit-profile/${userId}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const getHomeProfiles = (userId) => API.get(`/profile/home/${userId}`);
export const likeUser = (likerId, likedId) =>
  API.post(`/likes/like`, { likerId, likedId });
export const getLikedYou = (userId) => API.get(`likes/liked-you/${userId}`);
export const getYouLiked = (userId) => API.get(`likes/you-liked/${userId}`);
export const sendMessage = async (conversationId, senderId, text) =>
  await API.post(`/chat/messages/`, { conversationId, senderId, text });
export const getMessages = async (conversationId) =>
  await API.get(`/chat/messages/${conversationId}`);

// ✅ Get chat list (conversations)
export const getChats = (userId) => API.get(`/chat/chats/${userId}`);

// ✅ Start a new conversation
export const startChat = (user1Id, user2Id) =>
  API.post(`/chat/start-chat`, { user1Id, user2Id });
