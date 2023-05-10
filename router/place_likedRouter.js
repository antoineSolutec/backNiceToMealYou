const controller = require('../controller/place_likedControlle');
const express = require("express");
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json({ limit: "100mb" });
const auth = require('../shared/auth');


router.get("/place_like/:id", auth, controller.getLikeOfUser);
router.post("/place_like", auth, jsonParser, controller.addLike);
router.delete("/place_like", auth, jsonParser, controller.deleteLike);


module.exports = router;