import express from "express";
import {
  createProduct,
  DeleteProduct,
  getall,
  getByid,
  UpdateProduct,
} from "../controllers/ProductControllers.js";
const ProductRouter = express.Router();

ProductRouter.post("/products", createProduct);
ProductRouter.get("/products", getall);
ProductRouter.get("/products/:id", getByid);
ProductRouter.delete("/products/:id", DeleteProduct);
ProductRouter.put("/products/:id", UpdateProduct);
export default ProductRouter;
