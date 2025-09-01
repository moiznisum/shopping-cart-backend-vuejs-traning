import express from 'express';
import path from 'path';
import http from 'http';
import os from 'os';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { l, logger } from './logger.js';
import { fileURLToPath } from "url";


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsPath = path.join(__dirname, "../../uploads");

const corsOptions = {
  origin: "*",
  methods: 'GET,PUT,POST,DELETE,',
  optionsSuccessStatus: 200,
  credentials: true,
  allowedHeaders: 'Content-Type, Authorization, Credentials'
};

export default class ExpressServer {
  constructor() {
    const root = path.normalize(`${path.resolve()}/..`);

    app.use(express.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(
      express.urlencoded({
        extended: true,
        limit: process.env.REQUEST_LIMIT || '100kb',
      })
    );
    app.use(express.text({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(
      cookieParser('', {
        maxAge: 60 * 60 * 24 * 14 * 1000,
        httpOnly: true,
      })
    );
    app.use(express.static(`${root}/server/dist`));
    app.use(cors(corsOptions));
    app.use("/uploads", express.static(uploadsPath));

  }

  router(routes) {
    this.routes = routes;
    return this;
  }

  listen(port) {
    const welcome = (p) => () =>
      l.info(
        `up and running in production @: ${os.hostname()} on port: ${p}`
      );

    this.routes(app);
    http.createServer(app).listen(port, welcome(port));

    return app;
  }
}
