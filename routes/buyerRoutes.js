import express from "express";
const router = express.Router();

import {
	getSellers,
	getSellerCatalog,
	createOrder,
} from "../controllers/buyerController.js";
import { protectBuyer } from "../middleware/authMiddleware.js";

// Define the route for fetching all sellers
router.get("/list-of-sellers", getSellers);

// Define the route for fetching a seller's catalog by seller_id
router.get("/seller-catalog/:seller_id", getSellerCatalog);

router.post("/create-order/:seller_id", protectBuyer, createOrder);

export default router;
