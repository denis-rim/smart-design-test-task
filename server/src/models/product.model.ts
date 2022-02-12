import mongoose from "mongoose";

export interface ProductDocument extends mongoose.Document {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  manufacturer: string;
  ram: number;
  storage: number;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    manufacturer: { type: String, required: true },
    ram: { type: Number, required: true },
    storage: { type: Number, required: true },
    color: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model<ProductDocument>("Product", productSchema);

export default ProductModel;
