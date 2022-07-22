import { Session } from "../../models/session.model.js";

const isAuthenticated = (sessionID) => {
    return new Promise((resolve, reject) => {
        Session.findOne({ sessionID: sessionID })
            .then((foundSession) => {
                if (foundSession) {
                    resolve(foundSession.userId);
                } else {
                    reject("session_id_unavailable");
                }
            })
            .catch((error) => {
                reject({ error: error });
            });
    });
};

export default isAuthenticated;
