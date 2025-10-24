// import axios from "axios";

// export const getAllProducts = async (req, res) => {
//   try {
//     // Forward request to Catalog API
//     const response = await axios.get("http://localhost:4001/api/products");
//     const products = response.data;
//     res.render("products", { title: "Products", products });
//   } catch (error) {
//     console.error("Error fetching products:", error.message);
//     res.status(500).send("Failed to load products.");
//   }
// };

import apiClient from "../utils/apiClient.js";

/* Proxy endpoints (used by frontend or other services via /api) */
export const proxyCatalogProducts = async (req, res, next) => {
  try {
    const products = await apiClient.get("/catalog/products");
    res.json(products);
  } catch (err) {
    next(err);
  }
};

export const proxyCatalogProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await apiClient.get(`/catalog/products/${id}`);
    res.json(product);
  } catch (err) {
    next(err);
  }
};
