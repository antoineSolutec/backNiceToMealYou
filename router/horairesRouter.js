const controller = require('../controller/horairesController');
const express = require("express");
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json({ limit: "100mb" });
const auth = require('../shared/auth');





router.get("/horairesType", auth, controller.getTypes);
router.get("/horaires/:id", auth, controller.getHorairesOfPlace);
router.get("/horaires", auth, controller.getAllHoraires);
router.post("/horaires", auth, jsonParser, controller.addHoraires);
router.patch("/horaires", auth, jsonParser, controller.updateHoraires);
router.delete("/horaires/:id", auth, controller.deleteHoraires);


module.exports = router;