import { Router } from "express";
import { ProductModel } from "../models/product.model.js";

const router = Router();


router.get("/", async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;

    const filter = {};

    if (query) {
      filter.$or = [
        { category: query },
        { status: query === "true" }
      ];
    }

    const options = {
      limit: parseInt(limit),
      skip: (parseInt(page) - 1) * limit,
      sort: sort === "asc" ? { price: 1 } :
            sort === "desc" ? { price: -1 } : {},
      lean: true
    };

    const total = await ProductModel.countDocuments(filter);
    const products = await ProductModel.find(filter, null, options);
    const totalPages = Math.ceil(total / limit);

    res.send({
      status: "success",
      payload: products,
      totalPages,
      page: parseInt(page),
      prevPage: page > 1 ? parseInt(page) - 1 : null,
      nextPage: parseInt(page) < totalPages ? parseInt(page) + 1 : null,
      hasPrevPage: page > 1,
      hasNextPage: parseInt(page) < totalPages,
      prevLink: page > 1 ? `/api/products?page=${parseInt(page) - 1}` : null,
      nextLink: parseInt(page) < totalPages ? `/api/products?page=${parseInt(page) + 1}` : null
    });

  } catch (error) {
    res.send({ status: "error", error: error.message });
  }
});


router.get("/:pid", async (req, res) => {
  const product = await ProductModel.findById(req.params.pid).lean();

  if (!product)
    return res.status(404).json({ error: "Producto no encontrado" });

  res.json(product);
});


router.post("/", async (req, res) => {
  try {
    const newProduct = await ProductModel.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.put("/:pid", async (req, res) => {
  try {
    const updated = await ProductModel.findByIdAndUpdate(
      req.params.pid,
      req.body,
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ error: "Producto no encontrado" });

    res.json(updated);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.delete("/:pid", async (req, res) => {
  const deleted = await ProductModel.findByIdAndDelete(req.params.pid);

  if (!deleted)
    return res.status(404).json({ error: "Producto no encontrado" });

  res.json({ message: "Producto eliminado" });
});

export default router;
