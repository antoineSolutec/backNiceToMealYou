const controller = require('../controller/stationController');
const express = require("express");
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json({ limit: "100mb" });
const auth = require('../shared/auth');

router.get("/station", auth, controller.getAllStations);
router.get("/station/:id", auth, controller.getStationsOfLigne);

router.post("/station", auth, jsonParser, controller.addStation);


module.exports = router;