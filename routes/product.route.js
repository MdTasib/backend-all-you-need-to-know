const express = require("express");
const {
	getProduct,
	createProduct,
	bulkUpdateProduct,
	updateProductById,
	deleteProductById,
} = require("../controllers/product.controller");
const router = express.Router();

router.route("/bulk-update").patch(bulkUpdateProduct);

router.route("/").get(getProduct).post(createProduct);

router.route("/:id").patch(updateProductById).delete(deleteProductById);

module.exports = router;
