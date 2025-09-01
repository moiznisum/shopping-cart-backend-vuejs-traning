import { Schema, model } from "mongoose";

const OrderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, default: 1, min: 1 },
        price: { type: Number, required: true }, // price at purchase time
      },
    ],
    billSummary: {
      totalPrice: { type: Number, required: true },
      originalPrice: { type: Number, required: true },
      discount: { type: Number, default: 0 },
      storePickupFee: { type: Number, default: 0 },
      taxAmount: { type: Number, default: 0 },
    },
    status: {
      type: String,
      default: "pending",
    },
    isCompleted: { type: Boolean, default: false },
    isCancelled: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Order = model("Order", OrderSchema);
export default Order;
