const controller = require('../controller/station_of_userController');
const express = require("express");
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json({ limit: "100mb" });
const auth = require('../shared/auth');






router.get("/station_of_user/:id", auth, jsonParser, controller.getStationsOfUser);
router.post("/station_of_user", auth, jsonParser, controller.addStationOfUser);
router.delete("/station_of_user/:id", auth, controller.deleteStationOfUser);


module.exports = router;