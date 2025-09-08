/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated unique identifier
 *         name:
 *           type: string
 *           description: Name of the product
 *         description:
 *           type: string
 *           description: Product description
 *         price:
 *           type: string
 *           description: Price of the product (stored as string)
 *         stock:
 *           type: number
 *           description: Available stock quantity
 *         rating:
 *           type: number
 *           description: Product rating
 *         totalPurchase:
 *           type: number
 *           description: Total number of purchases
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Tags related to the product
 *         category:
 *           type: string
 *           description: Product category
 *         brand:
 *           type: string
 *           description: Product brand
 *         image:
 *           type: string
 *           description: Image URL
 *         discount:
 *           type: number
 *           description: Discount percentage
 *         type:
 *           type: string
 *           description: Product type (e.g., phone, laptop, accessory)
 *         variants:
 *           type: array
 *           description: Variants of the product
 *           items:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Variant title (e.g., Color, Size)
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       description: Variant item title (e.g., Red, Large)
 *                     price:
 *                       type: number
 *                       description: Variant price
 *                     colorCode:
 *                       type: string
 *                       description: Hex color code for the variant
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Product creation timestamp
 *       example:
 *         id: 64f1b2e8a1d3f0a2b5d8a9f2
 *         name: "iPhone 15 Pro"
 *         description: "Latest Apple smartphone with A17 Bionic chip"
 *         price: "1299.99"
 *         stock: 100
 *         rating: 4.7
 *         totalPurchase: 500
 *         tags: ["smartphone", "apple", "ios"]
 *         category: "Phones"
 *         brand: "Apple"
 *         image: "https://example.com/images/iphone15pro.jpg"
 *         discount: 10
 *         type: "Electronics"
 *         variants:
 *           - title: "Color"
 *             items:
 *               - title: "Black"
 *                 price: 1299.99
 *                 colorCode: "#000000"
 *               - title: "Silver"
 *                 price: 1299.99
 *                 colorCode: "#C0C0C0"
 *         createdAt: "2025-09-01T10:20:30Z"
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 *
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Invalid input
 *
 * /products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Product not found
 *
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Product not found
 *
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Product not found
 */

import express from "express";
import ProductController from "./controller.js";

const router = express.Router();

router.get("/", ProductController.get.bind(ProductController));
router.post("/", ProductController.create.bind(ProductController));
router.get("/:id", ProductController.getByID.bind(ProductController));
router.put("/:id", ProductController.update.bind(ProductController));
router.delete("/:id", ProductController.delete.bind(ProductController));

export default router;
