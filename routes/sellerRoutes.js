import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createCatalog } from "../controllers/sellerController.js";
const router = express.Router();

// Define the route to create a catalog for a seller
router.post("/create-catalog", protect, createCatalog);

export default router;
