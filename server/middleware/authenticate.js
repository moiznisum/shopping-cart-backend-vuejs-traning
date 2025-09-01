import jwt from "jsonwebtoken";
import User from "../models/users.js";

export function isAuthenticated() {
  return [
    // 1. Extract and verify token
    async (req, res, next) => {
      try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
          token = req.headers.authorization.split(" ")[1];
        } else if (req.cookies && req.cookies.token) {
          token = req.cookies.token;
        }

        if (!token) {
          return res.status(401).json({ message: "No token provided" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "bezkoder-secret-key");

        // Find user in DB
        const user = await User.findById(decoded.id);
        if (!user) {
          return res.status(401).json({ message: "User not found" });
        }

        req.user = user; // attach user to req
        next();
      } catch (err) {
        console.error(err);
        return res.status(401).json({ message: "Invalid or expired token" });
      }
    },
  ];
}
