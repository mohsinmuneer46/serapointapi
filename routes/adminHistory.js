const express = require("express");

const router = express.Router();

const userHistoryController = require("../controllers/adminHistory");

//********  ROUTES ************/

router.get("/:start/:count", userHistoryController.getHistory);

router.get("/:id", userHistoryController.getHistoryById);

router.get("/admin/:start/:count/:id", userHistoryController.getHistoryByAdminId);

module.exports = router;
