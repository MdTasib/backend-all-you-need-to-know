const {
	getProductService,
	createProductService,
	updateProductByIdService,
	bulkUpdateProductService,
	deleteProductByIdService,
	bulkDeleteProductService,
} = require("../services/product.services");

const getProduct = async (req, res, next) => {
	try {
		// ALL RPODUCTS
		// const products = await Product.find({});

		// GET A SINGLE PRODUCT BY ID
		// const product = await Product.find({ name: "Dall" });

		// FIND PRODUCT OR OPARETOR
		// const product = await Product.find({
		// 	$or: [{ _id: "6322b419107bef27c8460770" }, { price: 50 }],
		// });

		// FIND PRODUCT NOT EQUAL out-of-stock ($ne: "out-of-stock")
		/**
		 * Greater then / Greater then or equal - $gt / $gte
		 * Less then / less then or equal - $lt / $lte
		 * if name is Dall/Chal {name: {$in: ["Dall", "Chal"]}}
		 */
		//  const product = await getProductService();

		// EXCLUDE FIELDS FROM QUERY STRING ( ADVANCED )
		let filters = { ...req.query };

		// sort, page, limit -> exclude
		const excludeFields = ["sort", "page", "limit"];
		excludeFields.forEach(field => delete filters[field]);
		// console.log("Original object", req.query);
		// console.log("copy object", filters);

		// Filtering with Operators
		// http://localhost:5000/api/v1/product?price[lt]=50
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

			const skip = (page - 1) * Number(limit);
			queries.skip = skip;
			queries.limit = Number(limit);
		}

		const product = await getProductService(filters, queries);

		res.status(200).json({
			status: "sussess",
			data: product,
		});
	} catch (error) {
		res.status(400).json({
			status: "Failed",
			message: "Can't get data",
			error: error.message,
		});
	}
};

const createProduct = async (req, res, next) => {
	try {
		const result = await createProductService(req.body);

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

const updateProductById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const result = await updateProductByIdService(id, req.body);

		res.status(200).json({
			status: "success",
			message: "Updated successfully",
		});
	} catch (error) {
		res.status(400).json({
			status: "Failed",
			message: "Couldn't update product",
			error: error.message,
		});
	}
};

const bulkUpdateProduct = async (req, res, next) => {
	try {
		const result = await bulkUpdateProductService(req.body);

		res.status(200).json({
			status: "success",
			message: "Updated successfully",
		});
	} catch (error) {
		res.status(400).json({
			status: "Failed",
			message: "Couldn't update product",
			error: error.message,
		});
	}
};

const deleteProductById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const result = await deleteProductByIdService(id);

		if (!result.deletedCount) {
			return res.status(400).json({
				status: "Failed",
				message: "Couldn't delete the product",
			});
		}

		res.status(200).json({
			status: "success",
			message: "Delete successfully",
		});
	} catch (error) {
		res.status(400).json({
			status: "Failed",
			message: "Couldn't delete product",
			error: error.message,
		});
	}
};

const bulkDeleteProducts = async (req, res, next) => {
	try {
		const result = await bulkDeleteProductService(req.body.ids);

		res.status(200).json({
			status: "success",
			message: "Deleted successfully",
		});
	} catch (error) {
		res.status(400).json({
			status: "Failed",
			message: "Couldn't Deleted product",
			error: error.message,
		});
	}
};

const fileUpload = async (req, res) => {
	try {
		// SINGLE IMAGE UPLOAD
		// res.status(200).json(req.file);

		// MULTIPLE IMAGES UPLOAD
		res.status(200).json(req.files);
	} catch (error) {}
};

module.exports = {
	getProduct,
	createProduct,
	updateProductById,
	bulkUpdateProduct,
	deleteProductById,
	bulkDeleteProducts,
	fileUpload,
};
