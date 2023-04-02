const controller = require('../controller/type_picturesController');
const express = require("express");
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json({ limit: "100mb" });
const auth = require('../shared/auth');







router.get("/type", auth, controller.getAllTypePictures);
router.get("/type/:type", auth, controller.getTypePictures);

router.post("/type", auth, jsonParser, controller.addPictures);



module.exports = router;