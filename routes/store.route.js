const express = require("express");
const {
	createStore,
	getStores,
	getStoreById,
} = require("../controllers/store.controller");
const router = express.Router();

router.route("/").post(createStore).get(getStores);
router.route("/:id").get(getStoreById);

module.exports = router;
