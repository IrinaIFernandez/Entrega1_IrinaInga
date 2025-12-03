import { Router } from "express";
import { ProductModel } from "../models/product.model.js";
import { CartModel } from "../models/cart.model.js";

const router = Router();

router.get("/", (req, res) => {
    res.redirect("/products");
});

//productos
router.get("/products", async (req, res) => {
  const { limit = 10, page = 1, sort, query } = req.query;

  const filtro = {};
  if (query) {
    filtro.$or = [
      { category: query },
      { status: query === "true" }
    ];
  }

  const ordenar =
    sort === "asc" ? { price: 1 } :
    sort === "desc" ? { price: -1 } : {};

  const options = {
    limit: parseInt(limit),
    skip: (parseInt(page) - 1) * limit,
    sort: ordenar,
    lean: true
  };

  const totalDocs = await ProductModel.countDocuments(filtro);
  const products = await ProductModel.find(filtro, null, options);
  const totalPages = Math.ceil(totalDocs / limit);

  res.render("products", {
    products,
    page: parseInt(page),
    totalPages,
    hasPrevPage: page > 1,
    hasNextPage: parseInt(page) < totalPages,
    prevLink: page > 1 ? `/products?page=${parseInt(page) - 1}` : null,
    nextLink: parseInt(page) < totalPages ? `/products?page=${parseInt(page) + 1}` : null
  });
});

// detalle del producto
router.get("/products/:pid", async (req, res) => {
  const product = await ProductModel.findById(req.params.pid).lean();
  res.render("productDetail", { product });
});


router.get("/carts/:cid", async (req, res) => {
  const cart = await CartModel.findById(req.params.cid).lean();
  res.render("cart", { cart });
});

export default router;
