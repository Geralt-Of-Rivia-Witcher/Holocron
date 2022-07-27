import express from "express";

const router = express.Router();

import signup from "../api/controllers/signUp.js";
import login from "../api/controllers/login.js";
import logout from "../api/controllers/logout.js";
import storeNewCredential from "../api/controllers/storeNewCredential.js";
import fetchCredentials from "../api/controllers/fetchCredentials.js";
import deleteCredential from "../api/controllers/deleteCredential.js";
import checkLoggedIn from "../api/controllers/checkLoggedIn.js";

import allowCors from "../config/cors.js";

router.route("/signup").post(signup);

router.route("/check-logged-in").get(checkLoggedIn);

router.route("/login").post(login);

router.route("/logout").post(logout);

router.route("/add-new-credential").post(storeNewCredential);

router.route("/fetch-credentials").get(fetchCredentials);

router.route("/delete-credentials").delete(deleteCredential);

export default router;
