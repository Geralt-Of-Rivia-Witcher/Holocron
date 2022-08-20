import isAuthenticated from "../middlewares/isAuthenticated.js";

import { User } from "../../models/user.model.js";

const checkLoggedIn = (req, res) => {
    const sessionID = req.signedCookies.sessionID;

    isAuthenticated(sessionID)
        .then((userID) => {
            User.findOne({ _id: userID })
                .then((userData) => {
                    res.status(200).send({
                        message: "Logged in",
                        username: userData.username,
                    });
                })
                .catch((error) => {
                    res.status(500).send({
                        message: "Some error occured",
                        error: error,
                    });
                });
        })
        .catch((error) => {
            if (error === "session_id_unavailable") {
                res.status(404).send({ message: "Session ID not found" });
            } else {
                res.status(500).send({
                    message: "Some error occured",
                    error: error,
                });
            }
        });
};

export default checkLoggedIn;
