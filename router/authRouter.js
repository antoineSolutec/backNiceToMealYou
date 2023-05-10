const userController = require('../controller/authController');
const express = require("express");
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json({ limit: "100mb" });
const auth = require('../shared/auth');



router.get("/auth/login", userController.login);
router.get("/auth/image/:id", auth, userController.getImageOfUser);

router.post("/auth/token", jsonParser, userController.loginWithToken);
router.post("/auth", auth, jsonParser, userController.signup);
router.post("/auth/password", auth, jsonParser, userController.modifyPassword);
router.post("/auth/login", auth, jsonParser, userController.modifyLogin);
router.post("/auth/image", auth, jsonParser, userController.modifyImage);
router.patch("/auth/:id", auth, auth, jsonParser, userController.updateUser);
router.delete("/auth/:id", auth, userController.deleteUser);

module.exports = router;