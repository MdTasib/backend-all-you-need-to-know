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

const bulkUpdateProductService = async data => {
	// Bulk update for multiple product same price
	/* {
		"ids": [
			"6322b419107bef27c8460770",
			"6322bbc4f886271aac1f86fc"
		],
		"data": {
			"price": 150
		}
	} */
	// const result = await Product.updateMany({ _id: data.ids }, data.data, {
	// 	runValidators: true,
	// });

	// Bulk update for multiple product deferent price
	/* {
		"products": [
			{
				"id": "6322b419107bef27c8460770",
				"data": {"price": 333}
			},
			{
				"id": "6322bbc4f886271aac1f86fc",
				"data": {"price": 222}
			}
		]
	} */
	const products = [];

	data.products.forEach(product => {
		products.push(Product.updateOne({ _id: product.id }, product.data));
	});

	const result = await Promise.all(products);
	console.log(result);

	return result;
};

module.exports = {
	getProductService,
	createProductService,
	updateProductService,
	bulkUpdateProductService,
};
