const controller = require('../controller/stationController');
const express = require("express");
const router = express.Router();
const auth = require('../shared/auth');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json({ limit: "100mb" });

router.get("/station/coords/:location", auth, jsonParser, controller.getStationOfPlaceByCoords);
router.get("/station/id/:id", auth, jsonParser, controller.getStationOfPlaceById);
router.get("/region", auth, controller.getAllRegion);
router.get("/station/ligne/region/:region", auth, controller.getLignesOfRegion);
router.get("/station/station/ligne/:ligne", auth, controller.getStationsOfLigne);
router.get("/station/ligne/:ligne", auth, controller.getPlaceIdByLigne);
router.get("/station/station/:station", auth, controller.getPlaceIdByStation);


router.post("/station", jsonParser, auth, controller.addStationOfPlace);
module.exports = router;