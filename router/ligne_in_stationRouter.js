const controller = require('../controller/ligne_in_stationController');
const express = require("express");
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json({ limit: "100mb" });
const auth = require('../shared/auth');






router.get("/ligne_in_station/ligne/:ligne", auth, controller.getStationsOfLigne);
router.get("/ligne_in_station/station/:station", auth, controller.getLigneofStation);

router.post("/ligne_in_station", auth, jsonParser, controller.addStationForLigne);


module.exports = router;