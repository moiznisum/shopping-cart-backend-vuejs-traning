import Favourite from "../../../models/favourite.js";

class FavouriteService {
  async getByUser(userId) {
    if (!userId) throw { message: "User not found", code: 401 };

    return Favourite.find({ user: userId }).populate(
      "product",
      "name price image brand category"
    );
  }

  async add(userId, productId) {
    if (!userId || !productId) throw { message: "Invalid Payload", code: 400 };

    return Favourite.findOneAndUpdate(
      { user: userId, product: productId },
      { $set: { user: userId, product: productId } },
      { new: true, upsert: true } // ensures no duplicates
    ).populate("product", "name price image brand category");
  }

  async remove(userId, productId) {
    if (!userId || !productId) throw { message: "Invalid Payload", code: 400 };
    return Favourite.findOneAndDelete({ user: userId, product: productId });
  }
}

export default new FavouriteService();
