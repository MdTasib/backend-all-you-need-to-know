const Product = require("../models/Product");

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
		const product = await Product.find({ status: { $ne: "out-of-stock" } });

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
		const product = new Product(req.body);
		const result = await product.save();

		// INSTANCE METHODS - OPTIONAL
		result.logger();

		// SECOND WAY FOR THE POST DATA - ( CREATE ) METHOD
		// const result = await Product.create(req.body);

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

module.exports = { getProduct, createProduct };
