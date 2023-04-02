const userController = require('../controller/authController');
const express = require("express");
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const auth = require('../shared/auth');



router.get("/auth/login", userController.login);
router.get("/auth/token", userController.loginWithToken);
router.post("/auth", auth, jsonParser, userController.signup);
router.patch("/auth/:id", auth, auth, jsonParser, userController.updateUser);
router.delete("/auth/:id", auth, userController.deleteUser);

module.exports = router;