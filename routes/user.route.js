const express = require("express");
const { singup, login, getMe } = require("../controllers/user.controller");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

router.post("/singup", singup);
router.post("/login", login);
router.get("/me", verifyToken, getMe);

module.exports = router;
