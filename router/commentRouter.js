const controller = require('../controller/commentController');
const express = require("express");
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json({ limit: "100mb" });
const auth = require('../shared/auth');





router.get("/commentType", auth, controller.getTypes);
router.get("/comment/:ids", auth, jsonParser, controller.getComment);
router.get("/comment/points/:ids", auth, jsonParser, controller.getPoints);

router.get("/comment", auth, controller.getAllComments);

router.post("/comment/restaurants", auth, jsonParser, controller.addCommentRestaurant);
router.patch("/comment/restaurants", auth, jsonParser, controller.updateCommentRestaurant);
router.delete("/comment/:id", auth, controller.deleteComment);


module.exports = router;