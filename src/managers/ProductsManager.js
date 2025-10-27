import { promises as fs } from "fs";

export default class ProductsManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    const data = await fs.readFile(this.path, "utf-8");
    return JSON.parse(data || "[]");
  }

  async addProduct(product) {
    const products = await this.getProducts();
    const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

    const newProduct = { id, ...product };
    products.push(newProduct);

    await fs.writeFile(this.path, JSON.stringify(products, null, 2));
    return newProduct;
  }
}
