import express from "express";
import { getBasket } from "../controllers/basketController.js";
const router = express.Router();

router.get("/", getBasket);

export default router;
