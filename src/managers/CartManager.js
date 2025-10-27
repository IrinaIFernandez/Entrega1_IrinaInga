import { promises as fs } from "fs";

export default class CartManager {
  constructor(path) {
    this.path = path;
  }

  async getCarts() {
    const data = await fs.readFile(this.path, "utf-8");
    return JSON.parse(data || "[]");
  }

  async createCart() {
    const carts = await this.getCarts();
    const id = carts.length > 0 ? carts[carts.length - 1].id + 1 : 1;

    const newCart = { id, products: [] };
    carts.push(newCart);

    await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
    return newCart;
  }
}
