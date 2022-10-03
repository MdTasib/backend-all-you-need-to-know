const Stock = require("../models/Stock");

const getStockService = async (filters, queries) => {
	// const product = await Stock.find({ status: { $ne: "out-of-stock" } });
	// const product = await Stock.find({}).sort({ price: 1 });

	// http://localhost:5000/api/v1/product?sort=price,quantity
	// const product = await Product.find({}).sort(queries.sortBy);

	// http://localhost:5000/api/v1/product?sort=price,quantity&fields=name,description
	const { skip, limit, fields, sortBy } = queries;

	const stocks = await Stock.find(filters)
		.skip(skip)
		.limit(limit)
		.select(fields)
		.sort(sortBy);

	const totalStocks = await Stock.countDocuments(filters);
	const pageCount = Math.ceil(totalStocks / limit);

	return { totalStocks, pageCount, stocks };
};

const getStockByIdService = async id => {
	const stock = await Stock.findOne({ _id: id })
		.populate("brand.id")
		.populate("store.id")
		.populate("suppliedBy.id");
	return stock;
};

const createStockService = async data => {
	const stock = await Stock.create(data);
	return stock;
};

const updateStockByIdService = async (id, data) => {
	const stock = await Stock.findOne({ _id: id });
	const result = await stock.set(data).save();

	return result;
};

const bulkUpdateStockService = async data => {
	const stocks = [];

	data.stocks.forEach(product => {
		stocks.push(Stock.updateOne({ _id: product.id }, product.data));
	});

	const result = await Promise.all(products);

	return result;
};

const deleteStockByIdService = async id => {
	const result = await Stock.deleteOne({ _id: id });
	return result;
};

const bulkDeleteStockService = async ids => {
	const result = await Stock.deleteMany({});
	return result;
};

module.exports = {
	getStockService,
	createStockService,
	updateStockByIdService,
	bulkUpdateStockService,
	deleteStockByIdService,
	bulkDeleteStockService,
	getStockByIdService,
};
