const express = require("express");
const {
	getCategories,
	createCategory,
} = require("../controllers/category.controller");
const router = express.Router();

router.route("/").get(getCategories).post(createCategory);

module.exports = router;
