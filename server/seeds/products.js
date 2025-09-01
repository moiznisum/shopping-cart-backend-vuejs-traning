import allProducts from "../mocks/product.js";
import { l, logger } from "../commons/logger.js";
import Product from "../models/products.js";

const seedProducts = async () => {
  try {
    const count = await Product.countDocuments();

    if (count === 0) {
      l.info("📦 No products found, seeding...");
      await Product.insertMany(allProducts);
      l.info(`✅ Inserted ${allProducts.length} products`);
      return;
    }

    if (count < 30) {
      l.info(`⚠️ Found only ${count} products, resetting and reseeding...`);
      await Product.deleteMany({});
      l.info("🗑️ Old products removed");

      await Product.insertMany(allProducts);
      l.info(`✅ Inserted ${allProducts.length} products`);
      return;
    }

    l.info(`⚡ Seeding skipped — already have ${count} products in DB`);
  } catch (error) {
    l.error("❌ Error seeding database", error);
    console.error("❌ Error seeding database: ", error);
    logger.error(error);
  }
};

export default seedProducts;
