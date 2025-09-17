import OrderService from "./service.js";
import { l, logger } from "../../../commons/logger.js";

class OrderController {
  async create(req, res) {
    try {
      const order = await OrderService.create(req.body, req.user);
      res.status(201).json({ message: "Order placed successfully", order });
    } catch (error) {
      logger.error(error);
      l.error(error);
      res.status(error.code || 500).json({ message: error.message || "Error placing order" });
    }
  }

  async get(req, res) {
    try {
      const orders = await OrderService.get();
      res.status(200).json(orders);
    } catch (error) {
      logger.error(error);
      l.error(error);
      res.status(500).json({ message: error.message || "Error fetching orders" });
    }
  }

  async getById(req, res) {
    try {
      const order = await OrderService.getById(req.params.id);
      res.status(200).json(order);
    } catch (error) {
      logger.error(error);
      l.error(error);
      res.status(400).json({ message: error.message || "Error fetching order" });
    }
  }

  async getByUser(req, res) {
    try {
      const order = await OrderService.getByUser(req.user);
      res.status(200).json(order);
    } catch (error) {
      logger.error(error);
      l.error(error);
      res.status(400).json({ message: error.message || "Error fetching order" });
    }
  }

  async update(req, res) {
    try {
      const order = await OrderService.update(req.params.id, req.body);
      res.status(200).json({ message: "Order updated successfully", order });
    } catch (error) {
      logger.error(error);
      l.error(error);
      res.status(400).json({ message: error.message || "Error updating order" });
    }
  }

  async delete(req, res) {
    try {
      const order = await OrderService.delete(req.params.id);
      res.status(200).json({ message: "Order deleted successfully", order });
    } catch (error) {
      logger.error(error);
      l.error(error);
      res.status(400).json({ message: error.message || "Error deleting order" });
    }
  }

  async cancelOrder(req, res) {
    try {
      const order = await OrderService.cancelOrder(req.params.id);
      res.status(200).json({ message: "Order cancelled successfully", order });
    } catch (error) {
      logger.error(error);
      l.error(error);
      res.status(400).json({ message: error.message || "Error deleting order" });
    }
  }

  async completeOrder(req, res) {
    try {
      const order = await OrderService.completeOrder(req.params.id);
      res.status(200).json({ message: "Order marked as completed", order });
    } catch (error) {
      logger.error(error);
      l.error(error);
      res.status(400).json({ message: error.message || "Error deleting order" });
    }
  }
  
}

export default new OrderController();
