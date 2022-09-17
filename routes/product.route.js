const express = require("express");
const {
	getProduct,
	createProduct,
	updateProduct,
	bulkUpdateProduct,
} = require("../controllers/product.controller");
const router = express.Router();

router.route("/").get(getProduct).post(createProduct);
router.route("/bulk-update").patch(bulkUpdateProduct);
router.route("/:id").patch(updateProduct);

module.exports = router;
