import dotenv from "dotenv";
import { connectDB } from "./commons/database.js";
import routes from "./route.js";
import ExpressServer from "./commons/server.js";
import seedProducts from "./seeds/products.js";
import { swaggerDocs } from "./commons/swagger.js";

dotenv.config();

connectDB().then(() => {
    seedProducts();
});

const port = process.env.PORT || 5000;

const app = new ExpressServer()
    .router(routes)   // attach your routes
    .listen(port);

swaggerDocs(app);