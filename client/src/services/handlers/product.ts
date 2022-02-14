import { api } from "../apiClient";

export interface ProductModel {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  manufacturer: string;
  imageUrl: string;
  ram: string;
  storage: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

export function fetchProducts() {
  return api.get<null, { data: ProductModel[] }>("/products");
}

export function fetchProductById(id: string | undefined) {
  return api.get<null, { data: ProductModel }>(`/products/${id}`);
}
