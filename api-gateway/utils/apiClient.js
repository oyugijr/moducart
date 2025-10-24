import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const catalogBase = process.env.CATALOG_API_URL || "http://localhost:4001";
const basketBase = process.env.BASKET_API_URL || "http://localhost:4002";
const discountBase = process.env.DISCOUNT_API_URL || "http://localhost:4003";
const orderingBase = process.env.ORDERING_API_URL || "http://localhost:4004";

/**
 * Basic client exposing get/post to known services.
 * Paths passed in should start with /catalog, /basket, /discount, /orders etc.
 */
const client = {
  async get(path, opts = {}) {
    if (path.startsWith("/catalog")) {
      // forward /catalog/whatever -> {CATALOG_BASE}/api/whatever
      const p = path.replace("/catalog", "");
      const url = `${catalogBase}/api${p}`;
      const res = await axios.get(url, opts);
      return res.data;
    }
    if (path.startsWith("/orders")) {
      const res = await axios.get(`${orderingBase}/orders`, opts);
      return res.data;
    }
    // fallback: try ordering
    const res = await axios.get(`${orderingBase}${path}`, opts);
    return res.data;
  },

  async post(path, body, opts = {}) {
    if (path.startsWith("/orders")) {
      const res = await axios.post(`${orderingBase}/orders`, body, opts);
      return res.data;
    }
    if (path.startsWith("/catalog")) {
      // forward POST /catalog/... to catalog service
      const p = path.replace("/catalog", "");
      const res = await axios.post(`${catalogBase}/api${p}`, body, opts);
      return res.data;
    }
    // fallback to ordering service
    const res = await axios.post(`${orderingBase}${path}`, body, opts);
    return res.data;
  }
};

export default client;
