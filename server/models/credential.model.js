import mongoose from "mongoose";
import encrypt from "mongoose-encryption";

import { ENCRYPTION_KEY, SIGNING_KEY } from "../config/config.js";

var credentialSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    credentials: [
        {
            platform: String,
            username: String,
            email: String,
            password: String,
            date: Date,
        },
    ],
    lastUpdated: Date,
});

credentialSchema.plugin(encrypt, {
    encryptionKey: ENCRYPTION_KEY,
    signingKey: SIGNING_KEY,
    encryptedFields: ["credentials"],
    decryptPostSave: false,
});

export const Credential = mongoose.model("Credential", credentialSchema);
