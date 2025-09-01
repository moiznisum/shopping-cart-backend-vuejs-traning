import { Router } from "express";
import userRoute from "./user/index.js";
import authRoute from "./auth/index.js";
import productsRoute from "./products/index.js";
import ordersRoute from "./order/index.js";
import favouritesRoute from "./favourites/index.js";

const router = Router();

router.use("/user", userRoute);
router.use("/auth", authRoute);
router.use("/products", productsRoute);
router.use("/orders", ordersRoute);
router.use("/favourites", favouritesRoute);

export default router;