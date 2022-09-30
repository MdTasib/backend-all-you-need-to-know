const {
	createBrandService,
	getBrandsService,
	getBrandByIdService,
} = require("../services/brand.services");

const createBrand = async (req, res, next) => {
	try {
		const result = await createBrandService(req.body);

		res.status(200).json({
			status: "success",
			message: "successfully created the brand",
		});
	} catch (error) {
		res.status(400).json({
			status: "field",
			message: "Couldn't create new brand",
			error: error.message,
		});
	}
};

const getBrands = async (req, res, next) => {
	try {
		const result = await getBrandsService();

		res.status(200).json({
			status: "success",
			data: result,
		});
	} catch (error) {
		res.status(400).json({
			status: "field",
			message: "Couldn't get brands",
			error: error.message,
		});
	}
};

const getBrandById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const result = await getBrandByIdService(id);

		if (!result) {
			res.status(400).json({
				status: "field",
				message: "Couldn't get brand",
			});
		}

		res.status(200).json({
			status: "success",
			data: result,
		});
	} catch (error) {
		res.status(400).json({
			status: "field",
			message: "Couldn't get brand",
			error: error.message,
		});
	}
};

const updateBrand = async (req, res, next) => {
	try {
		const { id } = req.params;
		const result = await getBrandByIdService(id);

		if (!result) {
			res.status(400).json({
				status: "field",
				message: "Couldn't get brand",
			});
		}

		res.status(200).json({
			status: "success",
			data: result,
		});
	} catch (error) {
		res.status(400).json({
			status: "field",
			message: "Couldn't get brand",
			error: error.message,
		});
	}
};

module.exports = { createBrand, getBrands, getBrandById, updateBrand };
