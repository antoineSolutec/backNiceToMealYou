const controller = require('../controller/station_in_placeController');
const express = require("express");
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json({ limit: "100mb" });
const auth = require('../shared/auth');






router.get("/station_in_place/:id", auth, jsonParser, controller.getStationsOfPlace);
router.post("/station_in_place", auth, jsonParser, controller.addStationForPlace);
router.delete("/station_in_place/:id", auth, controller.deleteStationInPlace);


module.exports = router;