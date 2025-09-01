import { Schema, model } from "mongoose";
import crypto from "crypto";

export const UserModelName = "User";

const { Types } = Schema;

const UserSchema = new Schema({
  firstName: { type: Types.String },
  lastName: { type: Types.String },
  username: {
    type: Types.String,
    unique: true
  },
  email: {
    type: Types.String,
    unique: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  provider: String,
  salt: String,
  phone: {
    type: Types.String,
    unique: true
  },
  address: { type: Types.String },
  city: { type: Types.String },
  country: { type: Types.String },
  postalCode: { type: Types.String },
  profilePicture: { type: Types.String },
  resetPasswordToken: { type: Types.String },
  date: {
    type: Types.Date,
    default: Date.now
  }
});

/**
 * Virtuals
 */
UserSchema.virtual("profile").get(function () {
  return {
    name: this.name
  };
});

UserSchema.virtual("token").get(function () {
  return {
    _id: this._id
  };
});

/**
 * Validations
 */
UserSchema.path("email").validate(function (email) {
  return email.length;
}, "Email cannot be blank");

UserSchema.path("password").validate(function (password) {
  return password.length;
}, "Password cannot be blank");

// Validate email, username, phone uniqueness
UserSchema.path("email").validate(function (value) {
  return this.constructor.findOne({ email: value }).exec().then(user => {
    if (user) return this.id === user.id;
    return true;
  }).catch(err => { throw err; });
}, "The specified email address is already in use.");

UserSchema.path("username").validate(function (value) {
  return this.constructor.findOne({ username: value }).exec().then(user => {
    if (user) return this.id === user.id;
    return true;
  }).catch(err => { throw err; });
}, "The specified Username is already in use.");

UserSchema.path("phone").validate(function (value) {
  return this.constructor.findOne({ phone: value }).exec().then(user => {
    if (user) return this.id === user.id;
    return true;
  }).catch(err => { throw err; });
}, "The specified Phone Number is already in use.");

/**
 * Pre-save hook
 */
function validatePresenceOf(value) {
  return value && value.length;
}

UserSchema.pre("save", function (next) {
  const _this = this;

  if (!this.isModified("password")) return next();
  if (!validatePresenceOf(_this.password)) return next();

  _this.makeSalt((saltErr, salt) => {
    if (saltErr) return next(saltErr);
    _this.salt = salt;
    _this.encryptPassword(_this.password, (encryptErr, hashedPassword) => {
      if (encryptErr) return next(encryptErr);
      _this.password = hashedPassword;
      next();
    });
  });
});

/**
 * Methods
 */
UserSchema.methods = {
  authenticate(password, callback) {
    const _this = this;
    if (!callback) {
      return _this.password === _this.encryptPassword(password);
    }

    _this.encryptPassword(password, (err, pwdGen) => {
      if (err) return callback(err);
      return callback(null, _this.password === pwdGen);
    });
  },

  makeSalt(byteSize = 16, callback) {
    if (!callback && typeof byteSize === "function") {
      callback = byteSize;
      byteSize = 16;
    }

    return crypto.randomBytes(byteSize, (err, salt) => {
      if (err) return callback(err);
      return callback(null, salt.toString("base64"));
    });
  },

  encryptPassword(password, callback) {
    const _this = this;
    if (!password || !_this.salt) {
      if (!callback) return null;
      return callback("Missing password or salt");
    }

    const defaultIterations = 10000;
    const defaultKeyLength = 64;
    const salt = Buffer.from(_this.salt, "base64");

    if (!callback) {
      return crypto.pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength, "sha256").toString("base64");
    }

    return crypto.pbkdf2(password, salt, defaultIterations, defaultKeyLength, "sha256", (err, key) => {
      if (err) return callback(err);
      return callback(null, key.toString("base64"));
    });
  }
};

const User = model(UserModelName, UserSchema);

export default User;