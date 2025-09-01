import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { l, logger } from "./logger.js";

mongoose.Promise = global.Promise;

let isConnected = false;

const dbOptions = {};

// Custom labels for pagination
const mongoosePaginateOptions = {
  customLabels: {
    docs: "rows",
    limit: "pageSize",
    page: "pageIndex",
  },
};
mongoosePaginate.paginate.options = mongoosePaginateOptions;

export function connectDB() {
  return new Promise((resolve, reject) => {
    mongoose.connection.on("connected", function () {
      l.info("✅ Mongoose successfully connected");
      isConnected = true;
      resolve(mongoose.connection);
    });

    mongoose.connection.on("error", function (err) {
      logger.error(err);
      l.error(`❌ Mongoose connection error: ${err}`);
      reject(err);
    });

    mongoose.connection.on("disconnected", function () {
      l.warn("⚠️ Mongoose connection disconnected");
    });

    // Close connection if Node process ends
    process.on("SIGINT", async () => {
      try {
        await mongoose.connection.close();
        console.log(
          "Mongoose connection closed due to application termination"
        );
        process.exit(0);
      } catch (err) {
        console.error("Error closing mongoose connection", err);
        process.exit(1);
      }
    });

    try {
      const MONGO_URI = process.env.MONGODB_URI;

      mongoose.connect(MONGO_URI, dbOptions);
    } catch (err) {
      logger.error(err);
      console.error("MongoDB connection failed:", err);
      reject(err);
    }
  });
}
