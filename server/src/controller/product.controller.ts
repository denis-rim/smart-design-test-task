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
  const key = req.query.key;
  const value = req.query.value;
  const keyword = req.query.keyword;

  let query: Record<string, any> = {};

  if (keyword) {
    query.$or = [
      { name: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
      { manufacturer: { $regex: keyword, $options: "i" } },
    ];
  } else {
    if (key && value) {
      query[key] = value;
    }
    query = {};
  }

  try {
    const products = await searchProducts(query);

    return res.send(products);
  } catch (error) {
    return res.status(400).send(error);
  }
}
