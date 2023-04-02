const controller = require('../controller/picturesController');
const express = require("express");
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json({ limit: "100mb" });
const auth = require('../shared/auth');


router.get("/pictures/:id", auth, controller.getPicturesOfPlace);
router.get("/pictures", auth, controller.getAllPicturesSource);
router.post("/pictures", auth, jsonParser, controller.addPictures);
router.delete("/pictures/:id", auth, controller.deletePictures);


module.exports = router;