import FavouriteService from "./service.js";
import { l, logger } from "../../../commons/logger.js";

class FavouriteController {
  async get(req, res) {
    try {
      const favourites = await FavouriteService.getByUser(req.user._id);
      res.status(200).json(favourites);
    } catch (error) {
      logger.error(error);
      l.error(error);
      res.status(error.code || 500).json({ message: error.message || "Error fetching favourites" });
    }
  }

  async add(req, res) {
    try {
      const favourite = await FavouriteService.add(req.user._id, req.params.productId);
      res.status(201).json({ message: "Product added to favourites", favourite });
    } catch (error) {
      logger.error(error);
      l.error(error);
      res.status(error.code || 500).json({ message: error.message || "Error adding favourite" });
    }
  }

  async remove(req, res) {
    try {
      await FavouriteService.remove(req.user._id, req.params.productId);
      res.status(200).json({ message: "Product removed from favourites" });
    } catch (error) {
      logger.error(error);
      l.error(error);
      res.status(error.code || 500).json({ message: error.message || "Error removing favourite" });
    }
  }
}

export default new FavouriteController();
