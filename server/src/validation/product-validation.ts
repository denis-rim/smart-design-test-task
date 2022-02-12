import { object, string, number, TypeOf } from "zod";

const payload = {
  body: object({
    name: string({ required_error: "Name is required" })
      .min(2, "Name must be at least 2 characters long")
      .max(50, "Name must be at most 50 characters long"),
    price: number({ required_error: "Price is required" }),
    description: string({ required_error: "Description is required" })
      .min(2, "Description must be at least 2 characters long")
      .max(500, "Description must be at most 500 characters long"),
    category: string({ required_error: "Category is required" })
      .min(2, "Category must be at least 2 characters long")
      .max(50, "Category must be at most 50 characters long"),
    manufacturer: string({ required_error: "Manufacturer is required" })
      .min(2, "Manufacturer must be at least 2 characters long")
      .max(50, "Manufacturer must be at most 50 characters long"),
    ram: number({ required_error: "RAM is required" }),
    storage: number({ required_error: "Storage is required" }),
    color: string({ required_error: "Color is required" })
      .min(2, "Color must be at least 2 characters long")
      .max(50, "Color must be at most 50 characters long"),
  }),
};

const paramsProductId = {
  params: object({
    productId: string({ required_error: "Product ID is required" }),
  }),
};

const paramsSearchProducts = {
  query: object({
    search: string({ required_error: "Search is required" }),
  }),
};

export const createProductSchema = object({ ...payload });
export const getProductByIdSchema = object({ ...paramsProductId });
export const getProductsBySearchParams = object({ ...paramsSearchProducts });

export type CreateProductInput = TypeOf<typeof createProductSchema>;
export type GetProductByIdInput = TypeOf<typeof getProductByIdSchema>;
export type GetProductsBySearchInput = TypeOf<typeof getProductsBySearchParams>;
