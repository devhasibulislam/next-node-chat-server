// external import
const express = require("express");

// internal import
const chatController = require("../controllers/chats.controller");

// router connection
const router = express.Router();

router.post("/", chatController.postAMessage);
router.get("/", chatController.getAllMessage);
router.delete("/:id", chatController.deleteAMessage);

module.exports = router;