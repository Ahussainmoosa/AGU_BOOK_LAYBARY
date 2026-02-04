// src/services/properties.js
import api from "../api/axios";

const BASE_URL = "/properties";

export const PropertiesService = {
  async getProperties(id) {
    const res = await api.get(`${BASE_URL}/${id}`);
    return res.data;
  },

  async getAllProperties() {
    const res = await api.get(BASE_URL);
    return res.data;
  },

  async createProperties(formData) {
    const res = await api.post(BASE_URL, formData);
    return res.data;
  },

  async updateProperties(id, formData) {
    const res = await api.put(`${BASE_URL}/${id}`, formData);
    return res.data;
  },

  async deleteProperties(id) {
    const res = await api.delete(`${BASE_URL}/${id}`);
    return res.data;
  },
};
