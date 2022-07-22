import crypto from "crypto";

import { Session } from "../../models/session.model.js";

const createSession = (userId) => {
    var sessionID = crypto.randomUUID();

    return new Promise((resolve, reject) => {
        Session.findOneAndDelete({ userId: userId })
            .then(() => {
                Session.create({
                    sessionId: sessionID,
                    userId: userId,
                    createdAt: new Date(),
                })
                    .then(() => {
                        resolve(sessionID);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export default createSession;
