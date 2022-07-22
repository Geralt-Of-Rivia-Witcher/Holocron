import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { PORT, COOKIE_SECRET } from "./config/config.js";
import { corsOptions } from "./config/cors.js";
import createDbConnection from "./loaders/mongo.js";
import routes from "./routes/routes.js";

const app = express();

app.use(cors(corsOptions));
app.use(cookieParser(COOKIE_SECRET));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

app.get("/", () => {
    console.log("Server is up and running!");
});

app.listen(PORT, async () => {
    await createDbConnection();
    console.log(`Listening on ${PORT}`);
});
