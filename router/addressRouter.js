const controller = require('../controller/addressController');
const express = require("express");
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json({ limit: "100mb" });
const auth = require('../shared/auth');





router.get("/address/:id", auth, controller.getAddress);
router.get("/address", auth, controller.getAllAddress);
router.post("/address", auth, jsonParser, controller.addAddress);
router.patch("/address", auth, jsonParser, controller.updateAddress);
router.delete("/address/:id", auth, controller.deleteAddress);


module.exports = router;