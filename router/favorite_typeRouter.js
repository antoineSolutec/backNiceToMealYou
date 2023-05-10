const controller = require('../controller/favorite_typeController');
const express = require("express");
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json({ limit: "100mb" });
const auth = require('../shared/auth');






router.get("/like/:id", auth, controller.getFavoritesTypeOfUser);
router.post("/like", auth, jsonParser, controller.addFavoriteType);
router.patch("/like", auth, jsonParser, controller.updateFavoriteType);
router.delete("/like/:id", auth, controller.deleteFavoriteType);


module.exports = router;