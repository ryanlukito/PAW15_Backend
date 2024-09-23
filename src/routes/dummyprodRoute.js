import express from "express";
import {
  createProduct,
  getProductbyID,
  deleteProduct,
  getProducts,
  updateProduct
} from "../controllers/dummyProductController.js";

const router = express.Router();

router.get("/dummyproducts", getProducts);
router.get("/dummyproducts/:id", getProductbyID);
router.post("/dummyproducts", createProduct);
router.patch("/dummyproducts/:id", updateProduct);
router.delete("/dummyproducts/:id", deleteProduct);

export default router;
