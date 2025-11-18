import { Router } from "express";
import CartManager from "../managers/CartManager.js";
import ProductsManager from "../managers/ProductsManager.js";

const router = Router();
const cartManager = new CartManager("./src/data/carts.json");
const productManager = new ProductsManager("./src/data/products.json");

router.get("/", async (req, res) => {
  try {
    const carts = await cartManager.getCarts();
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los carritos" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el carrito" });
  }
});

router.get("/:cid", async (req, res) => {
  const cid = req.params.cid;
  const cart = await cartManager.getCartById(cid);
  if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });
  res.json(cart);
});

router.post("/:cid/product/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;

  const product = await productManager.getProductById(pid);
  if (!product) return res.status(404).json({ error: "Producto no encontrado" });

  const updatedCart = await cartManager.addProductToCart(cid, pid);
  if (!updatedCart) return res.status(404).json({ error: "Carrito no encontrado" });

  res.json(updatedCart);
});

export default router;
