import axios from "axios";

export const getBasket = async (req, res) => {
  try {
    const response = await axios.get("http://localhost:4002/api/basket");
    const basket = response.data;
    res.render("basket", { title: "Your Basket", basket });
  } catch (error) {
    console.error("Error fetching basket:", error.message);
    res.status(500).send("Failed to load basket.");
  }
};
