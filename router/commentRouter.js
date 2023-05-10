const controller = require('../controller/commentController');
const express = require("express");
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json({ limit: "100mb" });
const auth = require('../shared/auth');






router.get("/comment/:id", auth, controller.getComment);
router.post("/comment", auth, jsonParser, controller.addComment);
router.patch("/comment", auth, jsonParser, controller.updateComment);
router.delete("/comment/:id", auth, controller.deleteComment);


module.exports = router;