const Product = require("../models/Product");

const getProductService = async () => {
	const product = await Product.find({ status: { $ne: "out-of-stock" } });
	return product;
};

const createProductService = async data => {
	const product = await Product.create(data);
	return product;
};

const updateProductService = async (id, data) => {
	// Solution 1: before updating, check to validate like Schema
	// const product = await Product.updateOne(
	// 	{ _id: id },
	// 	{ $set: data },
	// 	{ runValidators: true }
	// );

	// Solution 2:
	// const product = await Product.findById(id);

	// // Solution 3:
	const product = await Product.findOne({ _id: id });
	const result = await product.set(data).save();

	return result;
};

module.exports = {
	getProductService,
	createProductService,
	updateProductService,
};
