const controller = require('../controller/ligneController');
const express = require("express");
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json({ limit: "100mb" });
const auth = require('../shared/auth');






router.get("/ligne", auth, controller.getAllLignes);
router.post("/ligne", auth, jsonParser, controller.addLigne);

module.exports = router;