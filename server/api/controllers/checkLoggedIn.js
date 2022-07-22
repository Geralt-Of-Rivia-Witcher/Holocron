import isAuthenticated from "../middlewares/isAuthenticated.js";

const checkLoggedIn = (req, res) => {
    const sessionID = req.signedCookies.sessionID;

    isAuthenticated(sessionID)
        .then(() => {
            res.status(200).json({ message: "Logged in" });
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
