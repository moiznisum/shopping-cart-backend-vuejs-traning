/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API endpoints for managing customer orders
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductItem:
 *       type: object
 *       properties:
 *         productId:
 *           type: string
 *           description: Product ID reference
 *           example: "64f8c2a81a8f2d001c8a7b22"
 *         quantity:
 *           type: number
 *           example: 2
 *         price:
 *           type: number
 *           example: 499.99
 *     BillSummary:
 *       type: object
 *       properties:
 *         totalPrice:
 *           type: number
 *           example: 999.98
 *         originalPrice:
 *           type: number
 *           example: 1099.98
 *         discount:
 *           type: number
 *           example: 100
 *         storePickupFee:
 *           type: number
 *           example: 0
 *         taxAmount:
 *           type: number
 *           example: 80
 *     Order:
 *       type: object
 *       required:
 *         - user
 *         - products
 *         - billSummary
 *       properties:
 *         _id:
 *           type: string
 *           example: "64f9c3a21a8f2d001c8a8b11"
 *         user:
 *           type: string
 *           description: User ID reference
 *           example: "64f7b9e21a8f2d001c8a6d44"
 *         products:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ProductItem'
 *         billSummary:
 *           $ref: '#/components/schemas/BillSummary'
 *         status:
 *           type: string
 *           enum: [pending, processing, shipped, delivered, cancelled]
 *           example: "pending"
 *         isCompleted:
 *           type: boolean
 *           example: false
 *         isCancelled:
 *           type: boolean
 *           example: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-09-01T10:15:30Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-09-01T10:20:45Z"
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Order successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Invalid input
 *
 *   get:
 *     summary: Get all orders (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       403:
 *         description: Forbidden
 *
 * /orders/user:
 *   get:
 *     summary: Get orders of the logged-in user
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user’s orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *
 * /orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 *
 *   patch:
 *     summary: Update order status (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, processing, shipped, delivered, cancelled]
 *                 example: "processing"
 *               isCompleted:
 *                 type: boolean
 *                 example: true
 *               isCancelled:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Order updated successfully
 *       404:
 *         description: Order not found
 *
 * /orders/{id}/cancel:
 *   patch:
 *     summary: Cancel an order (User or Admin)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order cancelled successfully
 *       400:
 *         description: Cannot cancel order
 *       404:
 *         description: Order not found
 *
 * /orders/{id}/complete:
 *   patch:
 *     summary: Mark an order as completed (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order marked as completed
 *       404:
 *         description: Order not found
 */

import express from "express";
import OrderController from "./controller.js";
import { isAuthenticated } from "../../../middleware/authenticate.js";

const router = express.Router();

router.get("/", isAuthenticated(), OrderController.get.bind(OrderController));
router.post(
  "/",
  isAuthenticated(),
  OrderController.create.bind(OrderController)
);
router.get("/:id", OrderController.getById.bind(OrderController));
router.put("/:id", OrderController.update.bind(OrderController));
router.delete("/:id", OrderController.delete.bind(OrderController));

export default router;
