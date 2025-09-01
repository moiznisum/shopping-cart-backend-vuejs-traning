// server/swagger.js
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { l } from "./../commons/logger.js";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Shopping Cart API",
      version: "1.0.0",
      description: "API documentation for Shopping Cart backend",
    },
    servers: [
      {
        url: "http://localhost:9000/api/v1", // 👈 adjust to your running server
      },
    ],
  },
  apis: ["./server/api/v1/**/*.js"], // 👈 scan for swagger annotations in routes/controllers
};

const swaggerSpec = swaggerJsdoc(options);

export function swaggerDocs(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  l.info("📄 Swagger Docs available at http://localhost:9000/api-docs");
}