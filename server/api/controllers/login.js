import bcrypt from "bcryptjs";

import { User } from "../../models/user.model.js";
import createSession from "../middlewares/createSession.js";

import { cookieOptions } from "../../config/cookie.js";

const login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username) {
        res.status(400).send({
            message: "Please enter a username",
        });
    } else if (!password) {
        res.status(400).send({
            message: "Please enter a password",
        });
    } else {
        User.findOne({ username: username })
            .then((userData) => {
                if (userData) {
                    if (bcrypt.compareSync(password, userData.password)) {
                        createSession(userData._id.toString())
                            .then((sessionID) => {
                                res.cookie(
                                    "sessionID",
                                    sessionID,
                                    cookieOptions
                                )
                                    .status(200)
                                    .send({
                                        message: "Logged in successfully",
                                        username: userData.username,
                                    });
                            })
                            .catch((error) => {
                                res.status(500).send({
                                    message: "Some error occured",
                                    error: error,
                                });
                            });
                    } else {
                        res.status(401).send({ message: "Incorrect password" });
                    }
                } else {
                    res.status(404).send({ message: "Username not found" });
                }
            })
            .catch((error) => {
                res.status(500).send({
                    message: "Some error occured",
                    error: error,
                });
            });
    }
};

export default login;
