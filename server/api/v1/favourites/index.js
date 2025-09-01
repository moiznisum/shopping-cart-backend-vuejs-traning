/**
 * @swagger
 * tags:
 *   name: Favourites
 *   description: Manage user favourite products
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Favourite:
 *       type: object
 *       required:
 *         - user
 *         - product
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID of the favourite entry
 *         user:
 *           type: string
 *           description: ID of the user
 *         product:
 *           type: object
 *           description: Product details
 *           properties:
 *             _id:
 *               type: string
 *             name:
 *               type: string
 *             price:
 *               type: number
 *             image:
 *               type: string
 *             brand:
 *               type: string
 *             category:
 *               type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /favourites:
 *   get:
 *     summary: Get all favourite products for logged-in user
 *     tags: [Favourites]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of favourites
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Favourite'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /favourites/{productId}:
 *   post:
 *     summary: Add a product to favourites
 *     tags: [Favourites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product to add to favourites
 *     responses:
 *       201:
 *         description: Product added to favourites
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product added to favourites
 *                 favourite:
 *                   $ref: '#/components/schemas/Favourite'
 *       400:
 *         description: Invalid Payload
 *       401:
 *         description: Unauthorized
 *
 *   delete:
 *     summary: Remove a product from favourites
 *     tags: [Favourites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product to remove from favourites
 *     responses:
 *       200:
 *         description: Product removed from favourites
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product removed from favourites
 *       400:
 *         description: Invalid Payload
 *       401:
 *         description: Unauthorized
 */

import express from "express";
import FavouriteController from "./controller.js";
import { isAuthenticated } from "../../../middleware/authenticate.js";

const router = express.Router();

router.get(
  "/",
  isAuthenticated(),
  FavouriteController.get.bind(FavouriteController)
);
router.post(
  "/:productId",
  isAuthenticated(),
  FavouriteController.add.bind(FavouriteController)
);
router.delete(
  "/:productId",
  isAuthenticated(),
  FavouriteController.remove.bind(FavouriteController)
);

export default router;
