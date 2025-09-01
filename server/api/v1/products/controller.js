import ProductService from "./service.js";

class ProductController {
  async get(req, res) {
    try {
      const products = await ProductService.get();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ message: err.message || "Error fetching products" });
    }
  }

  async create(req, res) {
    try {
      const product = await ProductService.create(req.body);
      res.status(201).json({ message: "Product created successfully", product });
    } catch (err) {
      res.status(400).json({ message: err.message || "Error creating product" });
    }
  }

  async getByID(req, res) {
    try {
      const product = await ProductService.getById(req.params.id);
      res.status(200).json(product);
    } catch (err) {
      res.status(400).json({ message: err.message || "Error fetching product" });
    }
  }

  async update(req, res) {
    try {
      const product = await ProductService.update(req.params.id, req.body);
      res.status(200).json({ message: "Product updated successfully", product });
    } catch (err) {
      res.status(400).json({ message: err.message || "Error updating product" });
    }
  }

  async delete(req, res) {
    try {
      const product = await ProductService.delete(req.params.id);
      res.status(200).json({ message: "Product deleted successfully", product });
    } catch (err) {
      res.status(400).json({ message: err.message || "Error deleting product" });
    }
  }
}

export default new ProductController();