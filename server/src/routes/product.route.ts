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
  "/:productId",
  validateResource(getProductByIdSchema),
  getProductByIdHandler
);

router.get(
  "/search",
  validateResource(getProductsBySearchParams),
  searchProductHandler
);

export default router;
