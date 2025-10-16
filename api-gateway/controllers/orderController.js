import axios from "axios";

export const getOrders = async (req, res) => {
  try {
    const response = await axios.get("http://localhost:4003/api/orders");
    const orders = response.data;
    res.render("orders", { title: "Orders", orders });
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).send("Failed to load orders.");
  }
};
