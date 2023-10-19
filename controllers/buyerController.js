import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import User from "../models/User.js";
import Catalog from "../models/Catalog.js";
import Order from "../models/Order.js"; // Import your Order model
import Product from "../models/Product.js";
import Items from "../models/Items.js";

const ObjectId = mongoose.Types.ObjectId;

// Controller function to fetch all sellers
const getSellers = asyncHandler(async (req, res) => {
	// Fetch all users with userType set to 'seller'
	const sellers = await User.find({ userType: "seller" }).select("-password");

	res.json(sellers);
});

const getSellerCatalog = asyncHandler(async (req, res) => {
	const { seller_id } = req.params;

	// Use the seller_id to find the catalog
	const catalog = await Catalog.findOne({ seller: seller_id }).populate(
		"products"
	);

	if (catalog) {
		res.json(catalog);
	} else {
		res
			.status(404)
			.json({ message: "Catalog not found for the specified seller." });
	}
});

const createOrder = asyncHandler(async (req, res) => {
	const { seller_id } = req.params;
	const { items } = req.body;

	try {
		// Ensure the seller exists
		const seller = await User.findById(seller_id);
		if (!seller || seller.userType !== "seller") {
			return res.status(400).json({ message: "Invalid seller ID." });
		}

		// Create a new order
		const order = new Order({
			buyer: req.user._id, // Use the authenticated buyer's ID
			catalog: seller_id, // Assign the seller_id to the order
			products: [],
		});

		for (const itemData of items) {
			const { productId, quantity } = itemData;

			// Ensure the product exists
			console.log("productId", productId);
			const product = await Product.findById(productId);
			if (!product) {
				return res.status(400).json({ message: "Invalid product ID." });
			}

			// Create a new item
			// const productObjectId = new ObjectId(productId);
			const item = new Items({
				products: productId,
				quantity,
			});
			// Add the item to the order
			await item.save();
			order.products.push(item._id);
		}

		// Save the order to the database
		console.log("order", order);
		await order.save();

		res.status(201).json({ message: "Order created successfully" });
	} catch (error) {
		console.error("Error creating order:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});
export { getSellers, getSellerCatalog, createOrder };
