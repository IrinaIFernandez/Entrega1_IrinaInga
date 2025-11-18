import fs from "fs";

export default class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async getProducts() {
        if (!fs.existsSync(this.path)) return [];
        const data = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(data);
    }

    async saveProducts(products) {
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
    }

    async getProductById(id) {
        const products = await this.getProducts();
        return products.find(p => p.id == id);
    }

    async addProduct(product) {
        const { title, description, price, code, stock, category } = product;

        if (!title || !description || !price || !code || !stock || !category) {
            throw new Error("Todos los campos son obligatorios");
        }

        const products = await this.getProducts();

        const newId = products.length ? products[products.length - 1].id + 1 : 1;

        const newProduct = {
            id: newId,
            ...product,
            status: true
        };

        products.push(newProduct);
        await this.saveProducts(products);

        return newProduct;
    }

    async updateProduct(id, data) {
        const products = await this.getProducts();
        const index = products.findIndex(p => p.id == id);

        if (index === -1) return null;

        if ("id" in data) delete data.id;

        products[index] = { ...products[index], ...data };

        await this.saveProducts(products);
        return products[index];
    }

    async deleteProduct(id) {
        const products = await this.getProducts();
        const filtered = products.filter(p => p.id != id);

        if (filtered.length === products.length) return false;

        await this.saveProducts(filtered);
        return true;
    }
}
