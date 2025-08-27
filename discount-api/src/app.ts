import express from "express";
import discountRoutes from "./routes/discountRoutes";

const app = express();

app.use(express.json());
app.use("/api/discounts", discountRoutes);

export default app;
