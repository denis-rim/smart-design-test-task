import mongoose from "mongoose";

export interface ProductInput extends mongoose.Document {
  name: string;
  price: number;
  description: string;
  category: string;
  manufacturer: string;
  ram: string;
  storage: string;
  color: string;
  imageUrl: string;
}

export interface ProductDocument extends ProductInput, mongoose.Document {
  _id: string;
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
    imageUrl: { type: String, required: true },
    ram: { type: String, required: true },
    storage: { type: String, required: true },
    color: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model<ProductDocument>("Product", productSchema);

export default ProductModel;
