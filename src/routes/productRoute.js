import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProductbyID,
  updateProduct,
} from "../controllers/productController.js";
import { verify } from "../middleware/auth.js";

const router = express.Router();

router.get("/products", verify, getProduct);
router.get("/products/:id", verify, getProductbyID);
router.post("/products", verify, createProduct);
router.patch("/products/:id", verify, updateProduct);
router.delete("/products/:id", verify, deleteProduct);

export default router;
