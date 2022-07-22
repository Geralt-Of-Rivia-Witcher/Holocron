import bcrypt from "bcryptjs";

import { User } from "../../models/user.model.js";

const salt = bcrypt.genSaltSync(10);

const signup = (req, res) => {
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
        const hashedPassword = bcrypt.hashSync(password, salt);

        const user = new User({
            username: username,
            password: hashedPassword,
            joinedAt: new Date(),
        });

        User.findOne({ username: username })
            .then((userData) => {
                if (userData) {
                    res.status(409).send({
                        message: "Username already exists",
                    });
                } else {
                    user.save()
                        .then(() => {
                            res.status(201).send({
                                message: "Successfully signed up",
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
    }
};

export default signup;
