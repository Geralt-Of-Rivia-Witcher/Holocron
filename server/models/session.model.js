import mongoose from "mongoose";

var sessionSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    createdAt: Date,
});

export const Session = mongoose.model("Session", sessionSchema);
