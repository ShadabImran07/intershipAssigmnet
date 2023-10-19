import express from "express";
const router = express.Router();

import { getSellers } from "../controllers/buyerController.js"; // Import the controller function

// Define the route for fetching all sellers
router.get("/list-of-sellers", getSellers);

export default router;
