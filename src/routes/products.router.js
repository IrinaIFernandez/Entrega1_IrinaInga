import { Router } from "express";
import ProductsManager from "../managers/ProductsManager.js";

const router = Router();
const productManager = new ProductsManager("./src/data/products.json");


router.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.json(products);
});

router.post("/", async (req, res) => {
  const product = req.body;
  const newProduct = await productManager.addProduct(product);
  res.status(201).json(newProduct);
});

export default router;
