import { Session } from "../../models/session.model.js";

const logout = (req, res) => {
    const sessionID = req.signedCookies.sessionID;

    Session.findOneAndDelete({ sessionID: sessionID })
        .then(() => {
            res.clearCookie("sessionID", {
                domain: "holocron-api.siddhantkumarsingh.me",
                path: "/",
            })
                .status(200)
                .send({ message: "Logged out successfully" });
        })
        .catch((error) => {
            res.status(500).send({
                message: "Log out unsuccessful",
                error: error,
            });
        });
};

export default logout;
