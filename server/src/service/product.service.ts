import { DocumentDefinition, FilterQuery } from "mongoose";
import ProductModel, {
  ProductDocument,
  ProductInput,
} from "../models/product.model";

export async function createProduct(
  input: DocumentDefinition<Omit<ProductInput, "createdAt" | "updatedAt">>
) {
  return ProductModel.create(input);
}

export async function getAllProducts() {
  return ProductModel.find();
}

export function searchProducts(query: FilterQuery<ProductDocument>) {
  return ProductModel.find(query);
}
