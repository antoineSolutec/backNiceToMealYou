const controller = require('../controller/barController');
const express = require("express");
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const auth = require('../shared/auth');






router.get("/bar", auth, controller.getAllBars);
router.get("/bar/:id", auth, controller.getBarById);
router.get("/bar/best/:params", auth, controller.getBestBars);
router.get("/bar/type/:type", auth, controller.getBarsByType);
router.get("/bar/arrondissement/:arrondissement", auth, controller.getBarsByArrondissement);
router.get("/bar/ligne/:ligne", auth, controller.getBarsOfLigne);
router.get("/bar/station/:station", auth, controller.getBarsOfStation);



router.post("/bar", auth, jsonParser, controller.addBar);
router.patch("/bar", jsonParser, auth, controller.updateBar);
router.delete("/bar/:id", auth, controller.deleteBar);


module.exports = router;