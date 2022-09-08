// external import
const express = require("express");

// internal import
const userController = require("../controllers/users.controller");

// router connection
const router = express.Router();

router.get("/", userController.getUsers);
router.post("/", userController.postAUser);
router.patch("/", userController.loggedInUser);
router.delete("/:id", userController.deleteAUser);

module.exports = router;