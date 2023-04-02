const controller = require('../controller/restaurantsController');
const express = require("express");
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json({ limit: "100mb" });
const auth = require('../shared/auth');

router.get("/restaurants/:id", auth, controller.getRestaurantById);
router.get("/restaurants", auth, controller.getAllRestaurants);
router.get("/restaurants/best/:params", auth, jsonParser, controller.getBestRestaurants);
router.get("/restaurants/type/:type", auth, controller.getRestaurantsByType);
router.get("/restaurants/arrondissement/:arrondissement", auth, controller.getRestaurantsByArrondissement);
router.get("/restaurants/ligne/:ligne", auth, controller.getRestaurantsOfLigne);
router.get("/restaurants/station/:station", auth, controller.getRestaurantsOfStation);


router.post("/restaurants", jsonParser, auth, controller.addRestaurant);
router.patch("/restaurants", jsonParser, auth, controller.updateRestaurant);
router.delete("/restaurants/:id", auth, controller.deleteRestaurant);


module.exports = router;