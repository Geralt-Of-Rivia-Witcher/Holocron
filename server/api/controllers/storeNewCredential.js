import { Credential } from "../../models/credential.model.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const storeNewCredential = (req, res) => {
    const sessionID = req.signedCookies.sessionID;

    isAuthenticated(sessionID)
        .then((userId) => {
            const newCredential = {
                platform: req.body.platform,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                date: new Date(),
            };

            Credential.findOne({ userId: userId })
                .then((foundCredential) => {
                    if (foundCredential) {
                        foundCredential.credentials.push(newCredential);

                        Credential.findOneAndRemove({
                            _id: foundCredential._id,
                        })
                            .then(() => {
                                Credential.create({
                                    userId: userId,
                                    credentials: foundCredential.credentials,
                                    lastUpdated: new Date(),
                                })
                                    .then(() => {
                                        res.status(201).send({
                                            message:
                                                "Credential saved successfully",
                                            credentials:
                                                foundCredential.credentials,
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
                                res.status(500).send({
                                    message: "Some error occured",
                                    error: error,
                                });
                            });
                    } else {
                        Credential.create({
                            userId: userId,
                            credentials: newCredential,
                            lastUpdated: new Date(),
                        })
                            .then(() => {
                                res.status(201).send({
                                    message: "Credential saved successfully",
                                });
                            })
                            .catch((error) => {
                                res.status(500).send({
                                    message: "Some error occured",
                                    error: error,
                                });
                            });
                    }
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

export default storeNewCredential;
