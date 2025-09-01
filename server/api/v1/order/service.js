import Order from "../../../models/order.js";

class OrderService {
  async create(orderData, user) {
    if (!user) {
      throw { message: "User Not Found", code: 401 };
    }

    const { products, billSummary, shippingAddress, paymentInformation } =
      orderData;

    if (
      !products ||
      products.length === 0 ||
      !billSummary ||
      !shippingAddress
    ) {
      throw { message: "Invalid Payload", code: 400 };
    }

    const orderInstance = new Order({
      user: user._id,
      products,
      billSummary,
      shippingAddress,
      paymentInformation,
      status: "pending", // default
    });

    return orderInstance.save();
  }

  async get() {
    return Order.find({})
      .populate("user", "name email")
      .populate("products.productId", "name price image");
  }

  async getById(id) {
    if (!id) throw { message: "Invalid Payload", code: 400 };

    const order = await Order.findById(id)
      .populate("user", "name email")
      .populate("products.productId", "name price image");

    if (!order) throw { message: "Order not found", code: 404 };
    return order;
  }

  async update(id, updateData) {
    if (!id || !updateData) throw { message: "Invalid Payload", code: 400 };

    const order = await Order.findByIdAndUpdate(id, updateData, { new: true });
    if (!order) throw { message: "Order not found", code: 404 };

    return order;
  }

  async delete(id) {
    if (!id) throw { message: "Invalid Payload", code: 400 };

    const order = await Order.findByIdAndDelete(id);
    if (!order) throw { message: "Order not found", code: 404 };

    return order;
  }
}

export default new OrderService();
