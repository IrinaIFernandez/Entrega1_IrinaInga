import fs from "fs";

export default class CartManager {
    constructor(path) {
        this.path = path;
    }

    async getCarts() {
        if (!fs.existsSync(this.path)) return [];
        const data = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(data);
    }

    async saveCarts(carts) {
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
    }

    async createCart() {
        const carts = await this.getCarts();

        const newCart = {
            id: carts.length ? carts[carts.length - 1].id + 1 : 1,
            products: []
        };

        carts.push(newCart);
        await this.saveCarts(carts);

        return newCart;
    }

    async getCartById(id) {
        const carts = await this.getCarts();
        return carts.find(c => c.id === id);
    }

    async addProductToCart(cartId, productId) {
        const carts = await this.getCarts();
        const cart = carts.find(c => c.id === cartId);

        if (!cart) return null;

        const product = cart.products.find(p => p.productId === productId);

        if (product) {
            product.quantity += 1;
        } else {
            cart.products.push({ productId, quantity: 1 });
        }

        await this.saveCarts(carts);
        return cart;
    }
}
