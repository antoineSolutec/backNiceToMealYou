const controller = require('../controller/placesController');
const express = require("express");
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const auth = require('../shared/auth');






router.get("/places", auth, controller.getAllPlaces);
router.get("/places/:id", auth, controller.getPlaceById);
router.get("/places/station/:station", auth, controller.getPlacesOfStation);
router.get("/places/ligne/:ligne", auth, controller.getPlacesOfLigne);


module.exports = router;