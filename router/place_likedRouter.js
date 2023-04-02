const controller = require('../controller/place_likedControlle');
const express = require("express");
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const auth = require('../shared/auth');






router.get("/like", auth, controller.getLikeOfUser);
router.post("/like", auth, jsonParser, controller.addLike);
router.delete("/like/:id", auth, controller.deleteLike);


module.exports = router;