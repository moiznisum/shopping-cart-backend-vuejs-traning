import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: String, required: true },
  stock: { type: Number, default: 0 },
  rating: { type: Number, default: 0.0 },
  totalPurchase: { type: Number, default: 0 },
  tags: [{ type: String }],
  category: { type: String },
  brand: { type: String },
  image: { type: String },
  discount: { type: Number, default: 0 },
  type: { type: String },
  variants: [
    {
      title: { type: String },
      items: [
        {
          title: { type: String },
          price: { type: Number },
          colorCode: { type: String },
        },
      ],
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export const ProductModelName = "Product";
const Product = model(ProductModelName, ProductSchema);
export default Product;
