import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import Catalog from "../models/Catalog.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

const createCatalog = async (req, res, next) => {
	try {
		const { products } = req.body; // Assuming you pass sellerId and products in the request body
		// Ensure the sellerId is valid
		if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
			return res.status(400).json({ message: "Invalid sellerId" });
		}

		// Create a new catalog
		const catalog = new Catalog({
			seller: req.user._id,
			products: [],
		});

		// Iterate through the list of products and add them to the catalog
		for (const product of products) {
			const { name, price } = product;

			// Create a new product
			const newProduct = new Product({
				name,
				price,
			});

			// Save the product to the database
			await newProduct.save();

			// Add the product's ObjectId to the catalog
			catalog.products.push(newProduct._id);
		}

		// Save the catalog to the database
		await catalog.save();

		res
			.status(201)
			.json({ message: "Catalog and products created successfully" });
	} catch (error) {
		console.error("Error creating catalog and products:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

// Create an API endpoint to get the list of orders received by a seller
const getOrdersForSeller = async (req, res) => {
	// Query the Order model to find orders with the given sellerId
	const orders = await Order.find({ catalog: req.user._id });

	res.status(200).json(orders);
};

export { createCatalog, getOrdersForSeller };
