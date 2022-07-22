import { Credential } from "../../models/credential.model.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const deleteCredential = (req, res) => {
    const sessionID = req.signedCookies.sessionID;
    const credentialId = req.query.credentialId;

    isAuthenticated(sessionID)
        .then((userId) => {
            Credential.findOne({ userId: userId })
                .then((foundCredential) => {
                    if (foundCredential) {
                        var indexToDelete = -1;

                        foundCredential.credentials.map(
                            (eachCredential, index) => {
                                if (
                                    eachCredential._id.toString() ===
                                    credentialId
                                ) {
                                    indexToDelete = index;
                                    return;
                                }
                            }
                        );
                        if (indexToDelete > -1) {
                            foundCredential.credentials.splice(
                                indexToDelete,
                                1
                            );
                            Credential.findOneAndRemove({ userId: userId })
                                .then(() => {
                                    Credential.create({
                                        userId: userId,
                                        credentials:
                                            foundCredential.credentials,
                                        lastUpdated: new Date(),
                                    })
                                        .then(() => {
                                            res.status(200).send({
                                                message:
                                                    "Credential deleted successfully",
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
                            res.status(404).send({
                                message: "Required credential not found",
                            });
                        }
                    } else {
                        res.status(404).send({
                            message: "No credential found",
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

export default deleteCredential;
