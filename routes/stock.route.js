const express = require("express");
const {
	getStock,
	createStock,
	updateStockById,
	deleteStockById,
	getStockById,
} = require("../controllers/stock.controller");
const router = express.Router();

router.route("/").get(getStock).post(createStock);
router
	.route("/:id")
	.get(getStockById)
	.patch(updateStockById)
	.delete(deleteStockById);

module.exports = router;
