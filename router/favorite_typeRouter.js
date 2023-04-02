const controller = require('../controller/favorite_typeController');
const express = require("express");
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const auth = require('../shared/auth');






router.get("/favorite/:id", auth, controller.getFavoritesTypeOfUser);
router.post("/favorite", auth, jsonParser, controller.addFavoriteType);
router.patch("/favorite", auth, jsonParser, controller.updateFavoriteType);
router.delete("/favorite/:id", auth, controller.deleteFavoriteType);


module.exports = router;