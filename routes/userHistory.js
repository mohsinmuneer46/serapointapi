const express = require("express");

const router = express.Router();

const userHistoryController = require("../controllers/userHistory");

//********  ROUTES ************/

router.get("/:start/:count", userHistoryController.getHistory);

router.get("/:start/:count/:id", userHistoryController.getHistoryById);

router.get("/admin/:start/:count/:adminId", userHistoryController.getHistoryByAdmin);

module.exports = router;

