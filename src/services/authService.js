// src/services/authService.js
import api from "../api/axios";

const BASE_URL = `/auth`;

const signUp = async (formData) => {
  try {
    const res = await api.post(`${BASE_URL}/register`, {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      contactNumber: formData.contactNumber,
      role: formData.role || "user"
    });

    return res.data;
  } catch (err) {
    console.log(err);
    throw new Error(
      err.response?.data || "Signup failed"
    );
  }
};

const signIn = async (formData) => {
  try {
    const res = await api.post(`${BASE_URL}/login`, {
      email: formData.email,
      password: formData.password
    });

    localStorage.setItem("isAuthenticated", "true");
    return res.data;
  } catch (err) {
    console.log(err);
    throw new Error(
      err.response?.data || "Signin failed"
    );
  }
};

const getMe = async () => {
  const res = await api.get("/users/me");
  localStorage.setItem("user", JSON.stringify(res.data));
  return res.data;
};

const signOut = async () => {
  localStorage.removeItem("user");
  localStorage.removeItem("isAuthenticated");
  return true;
};

export {
  signUp,
  signIn,
  signOut,
  getMe,
};
