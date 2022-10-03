const {
	createSupplierService,
	getSuppliersService,
	getSupplierByIdService,
	updateSupplierService,
} = require("../services/supplier.services");

const createSupplier = async (req, res, next) => {
	try {
		const result = await createSupplierService(req.body);

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

const getSuppliers = async (req, res, next) => {
	try {
		const result = await getSuppliersService();

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

const getSupplierById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const result = await getSupplierByIdService(id);

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

const updateSupplier = async (req, res, next) => {
	try {
		const { id } = req.params;
		const result = await updateSupplierService(id, req.body);

		if (!result.nModified) {
			res.status(400).json({
				status: "field",
				message: "Couldn't update brand",
			});
		}

		res.status(200).json({
			status: "success",
			message: "Brand updated successfully",
		});
	} catch (error) {
		res.status(400).json({
			status: "field",
			message: "Couldn't update brand",
			error: error.message,
		});
	}
};

module.exports = {
	createSupplier,
	getSuppliers,
	getSupplierById,
	updateSupplier,
};
