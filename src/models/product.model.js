import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  code: String,
  stock: Number,
  category: String,
  status: Boolean
});

export const ProductModel = mongoose.model("products", productSchema);
