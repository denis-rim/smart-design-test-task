import { Request, Response } from "express";

import {
  createProduct,
  getAllProducts,
  searchProducts,
} from "../service/product.service";
import {
  CreateProductInput,
  GetProductsBySearchInput,
} from "../validation/product-validation";

export async function createProductHandler(
  req: Request<{}, {}, CreateProductInput["body"]>,
  res: Response
) {
  const body = req.body;

  try {
    const product = await createProduct({ ...body });

    return res.send(product);
  } catch (error) {
    return res.status(400).send(error);
  }
}

export async function getAllProductHandler(req: Request, res: Response) {
  const product = await getAllProducts();

  return res.send(product);
}

export async function searchProductHandler(
  req: Request<{}, {}, {}, GetProductsBySearchInput["query"]>,
  res: Response
) {
  const brand = req.query.brand;
  const ram = req.query.ram;
  const internalStorage = req.query.internalStorage;
  const keyword = req.query.keyword;

  let query: Record<string, string | {}> = {};

  if (keyword) {
    query.$or = [
      { name: { $regex: keyword, $options: "i" } },
      { brand: { $regex: keyword, $options: "i" } },
    ];
  } else {
    // Bloody mess. Need to refactor some day.
    if (brand && ram && internalStorage) {
      query.$and = [
        { brand: { $regex: brand, $options: "i" } },
        { ram: { $regex: ram, $options: "i" } },
        { storage: { $regex: internalStorage, $options: "i" } },
      ];
    } else if (brand && ram) {
      query.$and = [
        { brand: { $regex: brand, $options: "i" } },
        { ram: { $regex: ram, $options: "i" } },
      ];
    } else if (brand && internalStorage) {
      query.$and = [
        { brand: { $regex: brand, $options: "i" } },
        { storage: { $regex: internalStorage, $options: "i" } },
      ];
    } else if (ram && internalStorage) {
      query.$and = [
        { ram: { $regex: ram, $options: "i" } },
        { storage: { $regex: internalStorage, $options: "i" } },
      ];
    } else if (brand) {
      query.brand = { $regex: brand, $options: "i" };
    } else if (ram) {
      query.ram = { $regex: ram, $options: "i" };
    } else if (internalStorage) {
      query.storage = { $regex: internalStorage, $options: "i" };
    }
  }

  try {
    const products = await searchProducts(query);

    return res.send(products);
  } catch (error) {
    return res.status(400).send(error);
  }
}
