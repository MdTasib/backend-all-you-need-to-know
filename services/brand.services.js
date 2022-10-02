const Brand = require("../models/Brand");

const getBrandsService = async () => {
	const brands = await Brand.find({}).select("-products -suppliers");
	return brands;
};

const createBrandService = async data => await Brand.create(data);

const getBrandByIdService = async id => {
	const brand = await Brand.findOne({ _id: id }).populate("products");
	return brand;
};

const updateBrandService = async (id, data) => {
	const result = await Brand.updateOne({ _id: id }, data, {
		runValidators: true,
	});
	return result;
};

module.exports = {
	createBrandService,
	getBrandsService,
	getBrandByIdService,
	updateBrandService,
};
