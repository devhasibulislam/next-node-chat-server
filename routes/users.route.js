// external importa
const express = require("express");
const jwt = require("jsonwebtoken");

// internal import
const userController = require("../controllers/users.controller");

// router connection
const router = express.Router();

// verify jwt
function verifyJWT(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }

    const token = authHeader.split[" "][1];
    jwt.sign(token, "911ee5ae6561b4fc", {
        expiresIn: "1h",
        algorithm: "HS256"
    }, (error, decoded) => {
        if(error){
            res.status(403).json({
                success: false,
                message: "Forbidden"
            })
        }
        req.decoded = decoded;
        next();
    })
}

router.get("/", userController.getUsers);
router.post("/", userController.postAUser);
router.patch("/", userController.loggedInUser);
router.delete("/:id", userController.deleteAUser);

module.exports = router;