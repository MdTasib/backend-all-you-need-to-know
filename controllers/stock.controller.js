const {
	getStockService,
	createStockService,
	updateStockByIdService,
	bulkUpdateStockService,
	deleteStockByIdService,
	bulkDeleteStockService,
	getStockByIdService,
} = require("../services/stock.services");

const getStock = async (req, res) => {
	try {
		let filters = { ...req.query };

		// sort, page, limit -> exclude
		const excludeFields = ["sort", "page", "limit"];
		excludeFields.forEach(field => delete filters[field]);

		// Filtering with Operators
		// http://localhost:5000/api/v1/Stock?price[lt]=50
		let filtersString = JSON.stringify(filters);
		filtersString = filtersString.replace(
			/\b(gt|gte|lt|lte)\b/g,
			match => `$${match}`
		);
		filters = JSON.parse(filtersString);

		const queries = {};

		if (req.query.sort) {
			const sortBy = req.query.sort.split(",").join(" ");
			queries.sortBy = sortBy;
		}

		if (req.query.fields) {
			const fields = req.query.fields.split(",").join(" ");
			queries.fields = fields;
		}

		if (req.query.page || req.query.limit) {
			const { page = 1, limit = 10 } = req.query;

			const skip = (page - 1) * parseInt(limit);
			queries.skip = skip;
			queries.limit = parseInt(limit);
		}

		const stocks = await getStockService(filters, queries);

		res.status(200).json({
			status: "sussess",
			data: stocks,
		});
	} catch (error) {
		res.status(400).json({
			status: "Failed",
			message: "Can't get data",
			error: error.message,
		});
	}
};

const getStockById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const result = await getStockByIdService(id);

		if (!result) {
			return res.status(400).json({
				status: "field",
				message: "Couldn't get stock",
			});
		}

		res.status(200).json({
			status: "success",
			data: result,
		});
	} catch (error) {
		res.status(400).json({
			status: "field",
			message: "Couldn't get stock",
			error: error.message,
		});
	}
};

const createStock = async (req, res, next) => {
	try {
		const result = await createStockService(req.body);

		res.status(200).json({
			status: "success",
			message: "Data inserted successfully",
			data: result,
		});
	} catch (error) {
		res.status(400).json({
			status: "Failed",
			message: "Data is't inserted",
			error: error.message,
		});
	}
};

const updateStockById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const result = await updateStockByIdService(id, req.body);

		res.status(200).json({
			status: "success",
			message: "Updated successfully",
		});
	} catch (error) {
		res.status(400).json({
			status: "Failed",
			message: "Couldn't update Stock",
			error: error.message,
		});
	}
};

const bulkUpdateStock = async (req, res, next) => {
	try {
		const result = await bulkUpdateStockService(req.body);

		res.status(200).json({
			status: "success",
			message: "Updated successfully",
		});
	} catch (error) {
		res.status(400).json({
			status: "Failed",
			message: "Couldn't update Stock",
			error: error.message,
		});
	}
};

const deleteStockById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const result = await deleteStockByIdService(id);

		if (!result.deletedCount) {
			return res.status(400).json({
				status: "Failed",
				message: "Couldn't delete the Stock",
			});
		}

		res.status(200).json({
			status: "success",
			message: "Delete successfully",
		});
	} catch (error) {
		res.status(400).json({
			status: "Failed",
			message: "Couldn't delete Stock",
			error: error.message,
		});
	}
};

const bulkDeleteStocks = async (req, res, next) => {
	try {
		const result = await bulkDeleteStockService(req.body.ids);

		res.status(200).json({
			status: "success",
			message: "Deleted successfully",
		});
	} catch (error) {
		res.status(400).json({
			status: "Failed",
			message: "Couldn't Deleted Stock",
			error: error.message,
		});
	}
};

module.exports = {
	getStock,
	createStock,
	updateStockById,
	bulkUpdateStock,
	deleteStockById,
	bulkDeleteStocks,
	getStockById,
};
