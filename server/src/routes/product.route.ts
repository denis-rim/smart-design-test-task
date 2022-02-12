import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Get router");
});

router.post("/", (req, res) => {
  res.send("Post router");
});

export default router;
