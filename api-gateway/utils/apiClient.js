import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const catalogBase = process.env.CATALOG_API_URL || "http://localhost:4001";
const basketBase = process.env.BASKET_API_URL || "http://localhost:4002";
const discountBase = process.env.DISCOUNT_API_URL || "http://localhost:4003";
const orderingBase = process.env.ORDERING_API_URL || "http://localhost:4004";

// timeout in ms for upstream requests (configurable via env)
const API_CLIENT_TIMEOUT = parseInt(process.env.API_CLIENT_TIMEOUT, 10) || 3000;

// create an axios instance that enforces timeouts
const axiosInstance = axios.create({ timeout: API_CLIENT_TIMEOUT });

function handleAxiosError(err, url) {
  // timeout
  if (err.code === "ECONNABORTED") {
    const e = new Error(`Request to ${url} timed out after ${API_CLIENT_TIMEOUT}ms`);
    e.status = 504;
    throw e;
  }
  // upstream responded with an error code
  if (err.response) {
    const status = err.response.status;
    const msg = `Upstream service returned ${status} for ${url}`;
    const e = new Error(msg);
    e.status = status;
    e.upstream = err.response.data;
    throw e;
  }
  // network / other error
  const e = new Error(`Network error requesting ${url}: ${err.message || err}`);
  throw e;
}

/**
 * Basic client exposing get/post to known services.
 * Paths passed in should start with /catalog, /basket, /discount, /orders etc.
 */
const client = {
  async get(path, opts = {}) {
    try {
      if (path.startsWith("/catalog")) {
        // forward /catalog/whatever -> {CATALOG_BASE}/api/whatever
        const p = path.replace("/catalog", "");
        const url = `${catalogBase}/api${p}`;
        const res = await axiosInstance.get(url, opts);
        return res.data;
      }
      if (path.startsWith("/orders")) {
        const url = `${orderingBase}/orders`;
        const res = await axiosInstance.get(url, opts);
        return res.data;
      }
      // fallback: try ordering
      const url = `${orderingBase}${path}`;
      const res = await axiosInstance.get(url, opts);
      return res.data;
    } catch (err) {
      // unify errors to be meaningful to callers
      handleAxiosError(err, path);
    }
  },

  async post(path, body, opts = {}) {
    try {
      if (path.startsWith("/orders")) {
        const url = `${orderingBase}/orders`;
        const res = await axiosInstance.post(url, body, opts);
        return res.data;
      }
      if (path.startsWith("/catalog")) {
        // forward POST /catalog/... to catalog service
        const p = path.replace("/catalog", "");
        const url = `${catalogBase}/api${p}`;
        const res = await axiosInstance.post(url, body, opts);
        return res.data;
      }
      // fallback to ordering service
      const url = `${orderingBase}${path}`;
      const res = await axiosInstance.post(url, body, opts);
      return res.data;
    } catch (err) {
      handleAxiosError(err, path);
    }
  }
};

export default client;
