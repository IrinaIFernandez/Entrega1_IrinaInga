import { Router } from "express";
import ProductManager from "../managers/ProductsManager.js"; 
import { getIO } from "../app.js";

const router = Router();

const productManager = new ProductManager("./src/data/products.json");

router.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.json(products);
});

router.get("/:pid", async (req, res) => {
  const pid = Number(req.params.pid);
  const product = await productManager.getProductById(pid);

  if (!product)
    return res.status(404).json({ error: "Producto no encontrado" });

  res.json(product);
});

router.post("/", async (req, res) => {
  try {
    const newProduct = await productManager.addProduct(req.body);

    const updatedProducts = await productManager.getProducts();
    getIO().emit("updateProducts", updatedProducts);

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el producto" });
  }
});

router.put("/:pid", async (req, res) => {
  const pid = Number(req.params.pid);
  const updated = await productManager.updateProduct(pid, req.body);

  if (!updated)
    return res.status(404).json({ error: "Producto no encontrado" });

  const updatedProducts = await productManager.getProducts();
  getIO().emit("updateProducts", updatedProducts);

  res.json(updated);
});

router.delete("/:pid", async (req, res) => {
  const pid = Number(req.params.pid);
  const deleted = await productManager.deleteProduct(pid);

  if (!deleted)
    return res.status(404).json({ error: "Producto no encontrado" });

  const updatedProducts = await productManager.getProducts();
  getIO().emit("updateProducts", updatedProducts);

  res.json({ message: "Producto eliminado" });
});

export default router;
