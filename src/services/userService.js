// src/services/userService.js
import api from "../api/axios";

const BASE_URL = `/users`;

export const index = async () => {
  try {
    const res = await api.get(`${BASE_URL}/me`);

    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
    throw new Error(
      err.response?.data?.message || "Failed to fetch user"
    );
  }
};
