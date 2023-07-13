const controller = require('../controller/restaurantController');
const express = require("express");
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json({ limit: "100mb" });
const auth = require('../shared/auth');

router.get("/restaurantType", auth, controller.getTypes);
router.get("/restaurant/:id", auth, controller.getRestaurantById);
router.get("/restaurant", auth, controller.getAllRestaurants);
router.get("/restaurant/verify/:params", auth, jsonParser, controller.getRestaurantByNameAndAddress);
router.get("/restaurant/details/:id", auth, jsonParser, controller.getPlaceDetail);

router.post("/restaurant", jsonParser, auth, controller.addRestaurant);
router.patch("/restaurant", jsonParser, auth, controller.updateRestaurant);
router.delete("/restaurant/:id", auth, controller.deleteRestaurant);


module.exports = router;