import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
	products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
	quantity: Number,
});

const Items = mongoose.model("Items", ItemSchema);
export default Items;
