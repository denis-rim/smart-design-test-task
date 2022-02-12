import express from "express";

import product from "./product.route";

const router = express.Router();

router.use("/products", product);

export default router;
