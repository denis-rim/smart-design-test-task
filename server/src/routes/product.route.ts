import express from "express";
import validateResource from "../middleare/validate-resource";
import {
  createProductSchema,
  getProductByIdSchema,
  getProductsBySearchParams,
} from "../validation/product-validation";
import {
  createProductHandler,
  getAllProductHandler,
  getProductByIdHandler,
  searchProductHandler,
} from "../controller/product.controller";

const router = express.Router();

router.post("/", validateResource(createProductSchema), createProductHandler);

router.get("/", getAllProductHandler);

router.get(
  "/search",
  validateResource(getProductsBySearchParams),
  searchProductHandler
);

router.get(
  "/:productId",
  validateResource(getProductByIdSchema),
  getProductByIdHandler
);

export default router;
