const Product = require("../models/Product");

const getProductService = async () => {
	const product = await Product.find({ status: { $ne: "out-of-stock" } });
	return product;
};

const createProductService = async data => {
	const product = await Product.create(data);
	return product;
};

module.exports = { getProductService, createProductService };
