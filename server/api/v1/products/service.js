import Product from "../../../models/products.js";

class ProductService {
  async get() {
    return Product.find({});
  }

  async create(productData) {
    const product = new Product(productData);
    return product.save();
  }

  async getById(id) {
    if (!id) throw { message: "Invalid Payload", code: 400 };
    return Product.findById(id);
  }

  async update(id, productData) {
    if (!id || !productData) throw { message: "Invalid Payload", code: 400 };
    return Product.findByIdAndUpdate(id, productData, { new: true });
  }

  async delete(id) {
    if (!id) throw { message: "Invalid Payload", code: 400 };
    return Product.findByIdAndDelete(id);
  }
}

export default new ProductService();
