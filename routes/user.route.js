const express = require("express");
const { singup } = require("../controllers/user.controller");
const router = express.Router();

router.post("/singup", singup);

module.exports = router;
