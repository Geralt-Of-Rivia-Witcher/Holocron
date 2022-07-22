import { Credential } from "../../models/credential.model.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const fetchCredentials = (req, res) => {
    const sessionID = req.signedCookies.sessionID;

    isAuthenticated(sessionID)
        .then((userId) => {
            Credential.findOne({ userId: userId })
                .then((foundCredential) => {
                    if (foundCredential) {
                        res.status(200).send({
                            message: "Credentials fetched successfully",
                            length: foundCredential.credentials.length,
                            data: foundCredential.credentials,
                        });
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

export default fetchCredentials;
