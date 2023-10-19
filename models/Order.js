import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
	buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	catalog: { type: mongoose.Schema.Types.ObjectId, ref: "Catalog" },
	products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
