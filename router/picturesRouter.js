const controller = require('../controller/picturesController');
const express = require("express");
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json({ limit: "100mb" });
const auth = require('../shared/auth');

router.get("/picsType", auth, controller.getTypes);
router.get("/pictures/:params", auth, controller.getPicturesOfPlaceByUser);
router.get("/pictures", auth, controller.getAllPicturesSource);
router.get("/pics", auth, controller.getAllPictures);

router.post("/pictures", auth, jsonParser, controller.addPictures);
router.delete("/pictures/:id", auth, controller.deletePictures);


module.exports = router;