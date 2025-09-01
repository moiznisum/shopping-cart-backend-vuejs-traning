import User from "../../../models/users.js";
import jwt from "jsonwebtoken";

class AuthService {

  async login({ email, password }) {
    let user = await User.findOne({ email })
            || await User.findOne({ username: email })
            || await User.findOne({ phone: email });

    if (!user) throw { message: "User not exists", code: 400 };

    const passwordIsValid = user.authenticate(password);
    if (!passwordIsValid) throw { message: "Email or Password invalid!", code: 400 };

    const token = jwt.sign({ id: user._id }, process.env?.JWT_SECRET || "bezkoder-secret-key", {
      expiresIn: 604800 // 1 week
    });

    return {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      phone: user.phone,
      accessToken: token,
      date: user.date,
      profilePicture: user.profilePicture
    };
  }
}

export default new AuthService();
