import mongoose from "mongoose";

const catalogSchema = new mongoose.Schema({
	seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

const Catalog = mongoose.model("Catalog", catalogSchema);

export default Catalog;
