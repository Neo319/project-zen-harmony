import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ModelSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
  category: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  price: { type: Number, required: true },
  in_stock: { type: Number, required: true },
});

export default mongoose.model("Category", ModelSchema);
