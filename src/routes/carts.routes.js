import { Router } from "express";
import { CartModel } from "../models/cart.model.js";
import { ProductModel } from "../models/product.model.js";

const router = Router();

router.get("/", async (req, res) => {
  const carts = await CartModel.find().lean();
  res.json(carts);
});


router.post("/", async (req, res) => {
  const newCart = await CartModel.create({ products: [] });
  res.status(201).json(newCart);
});


router.get("/:cid", async (req, res) => {
  const cart = await CartModel.findById(req.params.cid).lean();

  if (!cart)
    return res.status(404).json({ error: "Carrito no encontrado" });

  res.json(cart);
});


router.delete("/:cid/products/:pid", async (req, res) => {
  await CartModel.updateOne(
    { _id: req.params.cid },
    { $pull: { products: { product: req.params.pid } } }
  );

  res.send({ status: "success", message: "Producto eliminado" });
});


router.put("/:cid", async (req, res) => {
  const cart = await CartModel.findByIdAndUpdate(
    req.params.cid,
    { products: req.body.products },
    { new: true }
  );

  res.send({ status: "success", cart });
});


router.put("/:cid/products/:pid", async (req, res) => {
  await CartModel.updateOne(
    { _id: req.params.cid, "products.product": req.params.pid },
    { $set: { "products.$.quantity": req.body.quantity } }
  );

  res.send({ status: "success" });
});


router.delete("/:cid", async (req, res) => {
  await CartModel.findByIdAndUpdate(req.params.cid, { products: [] });
  res.send({ status: "success", message: "Carrito vaciado" });
});


router.post("/:cid/product/:pid", async (req, res) => {
  const product = await ProductModel.findById(req.params.pid);

  if (!product)
    return res.status(404).json({ error: "Producto no encontrado" });

  const cart = await CartModel.findById(req.params.cid);

  if (!cart)
    return res.status(404).json({ error: "Carrito no encontrado" });


  const existing = cart.products.find(p => p.product.toString() === req.params.pid);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.products.push({ product: req.params.pid, quantity: 1 });
  }

  await cart.save();
  res.redirect(`/carts/${req.params.cid}`);  // para que no "figure" el json de los productos
});

export default router;
