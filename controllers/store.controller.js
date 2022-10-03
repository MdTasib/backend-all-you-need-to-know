const {
	createStoreService,
	getStoreService,
	getStoreByIdService,
} = require("../services/store.services");

const getStores = async (req, res) => {
	try {
		const result = await getStoreService();

		res.status(200).json({
			status: "success",
			data: result,
		});
	} catch (error) {
		res.status(400).json({
			status: "field",
			message: "Couldn't get store",
			error: error.message,
		});
	}
};

const getStoreById = async (req, res) => {
	const { id } = req.params;
	try {
		const result = await getStoreByIdService(id);

		res.status(200).json({
			status: "success",
			data: result,
		});
	} catch (error) {
		res.status(400).json({
			status: "field",
			message: "Couldn't get store",
			error: error.message,
		});
	}
};

const createStore = async (req, res) => {
	try {
		const result = await createStoreService(req.body);

		res.status(200).json({
			status: "success",
			message: "Store created successfully",
		});
	} catch (error) {
		res.status(400).json({
			status: "field",
			message: "Couldn't created store",
			error: error.message,
		});
	}
};

module.exports = { createStore, getStores, getStoreById };
