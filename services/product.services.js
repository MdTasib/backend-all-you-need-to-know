const Product = require("../models/Product");

const getProductService = async (filters, queries) => {
	// const product = await Product.find({ status: { $ne: "out-of-stock" } });
	// const product = await Product.find({}).sort({ price: 1 });

	// http://localhost:5000/api/v1/product?sort=price,quantity
	// const product = await Product.find({}).sort(queries.sortBy);

	// http://localhost:5000/api/v1/product?sort=price,quantity&fields=name,description
	const product = await Product.find(filters)
		.sort(queries.sortBy)
		.select(queries.fields);
	return product;
};

const createProductService = async data => {
	const product = await Product.create(data);
	return product;
};

const updateProductByIdService = async (id, data) => {
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

const deleteProductByIdService = async id => {
	const result = await Product.deleteOne({ _id: id });
	return result;
};

const bulkDeleteProductService = async ids => {
	const result = await Product.deleteMany({});
	return result;
};

module.exports = {
	getProductService,
	createProductService,
	updateProductByIdService,
	bulkUpdateProductService,
	deleteProductByIdService,
	bulkDeleteProductService,
};
