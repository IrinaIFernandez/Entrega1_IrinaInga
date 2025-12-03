import { ProductModel } from "../models/product.model";

export default class ProductsManager {

  getProducts() {
    return ProductModel.find().lean();
  }

  getProductById(id) {
    return ProductModel.findById(id).lean();
  }

  addProduct(data) {
    return ProductModel.create(data);
  }

  updateProduct(id, update) {
    return ProductModel.findByIdAndUpdate(id, update, { new: true });
  }

  deleteProduct(id) {
    return ProductModel.findByIdAndDelete(id);
  }
}
