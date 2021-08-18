const express = require("express");

const router = express.Router();

const loginController = require("../controllers/login");

//********  ROUTES ************/

router.post("/", loginController.signint);


module.exports = router;
