const controller = require('../controller/customController');
const express = require("express");
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json({ limit: "100mb" });
const auth = require('../shared/auth');






router.get("/custom/placeInStation/:id", auth, controller.getPlaceInStationOfUser);
router.get("/custom/restaurantOfStation/:id", auth, controller.getRestaurantsOfStations);
router.get("/custom/barOfStation/:id", auth, controller.getBarsOfStations);
router.get("/custom/restaurantOfLigne/:id", auth, controller.getRestaurantsOfLigne);
router.get("/custom/barOfLigne/:id", auth, controller.getBarsOfLigne);
router.get("/custom/ligneOfPlace/:id", auth, controller.getLignesOfPlace);
router.post("/custom/restaurantsOfMultipleStations", auth, jsonParser, controller.getRestaurantsOfMutlipleStations);
router.post("/custom/barsOfMultipleStations", auth, jsonParser, controller.getBarsOfMutlipleStations);
router.post("/custom/restaurantsOfMultipleLignes", auth, jsonParser, controller.getRestaurantsOfMutlipleLignes);
router.post("/custom/barsOfMultipleLignes", auth, jsonParser, controller.getBarsOfMutlipleLignes);





module.exports = router;