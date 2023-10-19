import express from "express";
import { protectSeller } from "../middleware/authMiddleware.js";
import {
	createCatalog,
	getOrdersForSeller,
} from "../controllers/sellerController.js";
const router = express.Router();

// Define the route to create a catalog for a seller
router.post("/create-catalog", protectSeller, createCatalog);
router.get("/orders", protectSeller, getOrdersForSeller);

export default router;
