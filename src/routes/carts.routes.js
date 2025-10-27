import { Router } from "express";
import CartManager from "../managers/CartManager.js";

const router = Router();
const cartManager = new CartManager("./src/data/carts.json");


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

export default router;
