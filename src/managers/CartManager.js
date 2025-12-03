import { CartModel } from "../models/cart.model";

export default class CartManager {

  createCart() {
    return CartModel.create({ products: [] });
  }

  getCartById(id) {
    return CartModel.findById(id).populate("products.product").lean();
  }

  addProductToCart(cid, pid) {
    return CartModel.findByIdAndUpdate(
      cid,
      { $push: { products: { product: pid, quantity: 1 } } },
      { new: true }
    );
  }
}
