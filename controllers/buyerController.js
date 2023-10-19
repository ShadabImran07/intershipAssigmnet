import asyncHandler from "express-async-handler";
import User from "../models/User.js";

// Controller function to fetch all sellers
const getSellers = asyncHandler(async (req, res) => {
	// Fetch all users with userType set to 'seller'
	const sellers = await User.find({ userType: "seller" }).select("-password");

	res.json(sellers);
});

export { getSellers };
