import User from "./../../../models/users.js";

class UserService {

  async get() {
    return User.find({});
  }

  async create(userData) {
    const userInstance = new User(userData);
    return userInstance.save();
  }

  async getById(id) {
    if (!id) throw { message: "Invalid Payload", code: 400 };
    const user = await User.findById(id);
    return user;
  }

  async update(id, userData) {
    if (!id || !userData) throw { message: "Invalid Payload", code: 400 };
    const updatedUser = await User.findByIdAndUpdate(id, userData, { new: true });
    return updatedUser;
  }

  async delete(id) {
    if (!id) throw { message: "Invalid Payload", code: 400 };
    const deletedUser = await User.findByIdAndDelete(id);
    return deletedUser;
  }
}

export default new UserService();
