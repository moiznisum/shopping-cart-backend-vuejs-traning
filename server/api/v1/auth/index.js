/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication related APIs
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login with email, username or phone
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email, username or phone of the user
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: User password
 *                 example: secret123
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: User ID
 *                 email:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 username:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 accessToken:
 *                   type: string
 *                   description: JWT access token
 *                 date:
 *                   type: string
 *                   format: date-time
 *                 profilePicture:
 *                   type: string
 *                   description: URL to profile picture
 *       400:
 *         description: Invalid credentials or user not found
 */

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get logged-in user details
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched logged-in user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 email:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 username:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 address:
 *                   type: string
 *                 city:
 *                   type: string
 *                 country:
 *                   type: string
 *                 postalCode:
 *                   type: string
 *                 profilePicture:
 *                   type: string
 *       401:
 *         description: Not authorized
 */

import express from "express";
import { isAuthenticated } from "../../../middleware/authenticate.js";
import AuthController from "./controller.js";

const router = express.Router();

router.post("/login", AuthController.login.bind(AuthController));
router.get(
  "/me",
  isAuthenticated(),
  AuthController.getLoggedInUser.bind(AuthController)
);

export default router;
