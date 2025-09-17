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
      products.length === 0 
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

  async getByUser(user) {
    if (!user) throw { message: "Invalid Request", code: 400 };

    const orders = await Order.find({ user: user?._id });

    if (!orders) throw { message: "No Record Found", code: 403 };
    return orders;
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

  async cancelOrder(id) {
    if (!id) throw { message: "Cannot cancel order", code: 400 };

    const order = await Order.findById(id);

    if (!order) {
      throw { message: "Order not found", code: 404 };
    }

    if (order.isCompleted) {
      throw { message: "Cannot cancel order", code: 400 };
    }

    if (order.isCancelled) {
      throw new Error("Order is already cancelled");
    }

    order.isCancelled = true;
    order.status = "cancelled";
    await order.save();

    return order;
  }

  async completeOrder(id) {
    if (!id) throw { message: "Cannot cancel order", code: 400 };

    const order = await Order.findById(id);

    if (!order) {
      throw { message: "Order not found", code: 404 };
    }

    if (order.isCompleted) {
      throw { message: "Order is already completed", code: 400 };
    }

    if (order.isCancelled) {
      throw new Error("Cannot cancel order");
    }

    order.isCompleted = true;
    order.status = "completed";
    await order.save();

    return order;
  }
}

export default new OrderService();
