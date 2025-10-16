import axios from "axios";

export const getAllProducts = async (req, res) => {
  try {
    // Forward request to Catalog API
    const response = await axios.get("http://localhost:4001/api/products");
    const products = response.data;
    res.render("products", { title: "Products", products });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).send("Failed to load products.");
  }
};
