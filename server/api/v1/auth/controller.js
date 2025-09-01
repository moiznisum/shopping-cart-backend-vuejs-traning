import AuthService from "./service.js";
import { l, logger } from "./../../../commons/logger.js";
import { handleUserDetails } from "../../../utils/helper.js";

class AuthController {

  async login(req, res) {
    try {
      const response = await AuthService.login(req.body);
      res.cookie("token", response.accessToken, { httpOnly: true });
      res.status(200).json(response);
    } catch (error) {
      logger.error(error);
      l.error(error);
      res.status(error.code || 400).json({ message: error.message || "Login failed" });
    }
  }

  async getLoggedInUser(req, res) {
    try {
      const user = req.user;
      if (!user) return res.status(401).json({ message: "Not Authorized" });
      res.status(200).json(handleUserDetails(user));
    } catch (error) {
      logger.error(error);
      l.error(error);
      res.status(400).json({ message: error.message || "Error fetching user" });
    }
  }
}

export default new AuthController();
