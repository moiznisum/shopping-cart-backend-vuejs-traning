import UserService from "./service.js";
import { l, logger } from "./../../../commons/logger.js";

class UserController {

  async get(req, res) {
    try {
      const users = await UserService.get();
      res.status(200).json(users);
    } catch (error) {
      logger.error(error);
      l.error(error);
      res.status(500).json({ message: error.message || "Error fetching users" });
    }
  }

  async create(req, res) {
    try {
      const user = await UserService.create(req.body);
      res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
      logger.error(error);
      l.error(error);
      res.status(400).json({ message: error.message || "Error creating user" });
    }
  }

  async getByID(req, res) {
    try {
      const user = await UserService.getById(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      logger.error(error);
      l.error(error);
      res.status(400).json({ message: error.message || "Error fetching user" });
    }
  }

  async update(req, res) {
    try {
      const user = await UserService.update(req.params.id, req.body);
      res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
      logger.error(error);
      l.error(error);
      res.status(400).json({ message: error.message || "Error updating user" });
    }
  }

  async delete(req, res) {
    try {
      const user = await UserService.delete(req.params.id);
      res.status(200).json({ message: "User deleted successfully", user });
    } catch (error) {
      logger.error(error);
      l.error(error);
      res.status(400).json({ message: error.message || "Error deleting user" });
    }
  }
}

export default new UserController();
