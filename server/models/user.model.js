import mongoose from "mongoose";
import encrypt from "mongoose-encryption";

import { ENCRYPTION_KEY, SIGNING_KEY } from "../config/config.js";

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    joinedAt: Date,
});

userSchema.plugin(encrypt, {
    encryptionKey: ENCRYPTION_KEY,
    signingKey: SIGNING_KEY,
    encryptedFields: ["password"],
    decryptPostSave: false,
});

export const User = mongoose.model("User", userSchema);
