const express = require("express");
const {
	getProduct,
	createProduct,
	updateProduct,
} = require("../controllers/product.controller");
const router = express.Router();

router.route("/").get(getProduct).post(createProduct);
router.route("/:id").patch(updateProduct);

module.exports = router;
