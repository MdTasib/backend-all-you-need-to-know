const Product = require("../models/Product");
const {
	getProductService,
	createProductService,
	updateProductByIdService,
	bulkUpdateProductService,
	deleteProductByIdService,
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
		const product = await getProductService();

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
		// FIRST WAY FOR THE POST DATA - ( SAVE ) METHOD
		const result = await createProductService(req.body);

		// INSTANCE METHODS - OPTIONAL
		result.logger();

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

module.exports = {
	getProduct,
	createProduct,
	updateProductById,
	bulkUpdateProduct,
	deleteProductById,
};
