import { Router } from "express";
import ProductsManager from "../managers/ProductsManager.js";

const router = Router();
const productManager = new ProductsManager("./src/data/products.json");


router.get("/", async (req, res) => {
  const products = await productManager.getProducts();

  res.render("home", { products }); 
});


router.get("/realTimeProducts", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("realTimeProducts", { products }); 
});

export default router;
