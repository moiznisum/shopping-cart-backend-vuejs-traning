import pino from "pino";
import winston from "winston";
import "winston-daily-rotate-file";

const l = pino({
  name: process.env.APP_ID || "shoppingcart",
  level: process.env.LOG_LEVEL || "debug",   // fallback if env missing
});

const transport = new winston.transports.DailyRotateFile({
  filename: "./logs/shoppingcart-%DATE%.log",
  datePattern: "YYYY-MM-DD-HH",
  maxSize: "10m",
  maxFiles: "2d",
});

const logger = winston.createLogger({
  transports: [transport],
});

export { l, logger };
