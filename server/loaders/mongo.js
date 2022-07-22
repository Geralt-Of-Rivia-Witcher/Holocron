import mongoose from "mongoose";

import { MONGO_DB_URI } from "../config/config.js";

const createDbConnection = async () => {
    await mongoose
        .connect(MONGO_DB_URI)
        .then(() => {
            console.log("Connection to DB Successful");
        })
        .catch((err) => {
            console.log(`Connection to DB Failed. Error: ${err}`);
        });
};

export default createDbConnection;
