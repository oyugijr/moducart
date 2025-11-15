// import axios from "axios";

// export const getOrders = async (req, res) => {
//   try {
//     const response = await axios.get("http://localhost:4003/api/orders");
//     const orders = response.data;
//     res.render("orders", { title: "Orders", orders });
//   } catch (error) {
//     console.error("Error fetching orders:", error.message);
//     res.status(500).send("Failed to load orders.");
//   }
// };

import apiClient from "../utils/apiClient.js";

export const createOrderProxy = async (req, res, next) => {
  try {
    const payload = req.body;
    const created = await apiClient.post("/orders", payload);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

export const listOrdersProxy = async (req, res, next) => {
  try {
    const orders = await apiClient.get("/orders");
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

