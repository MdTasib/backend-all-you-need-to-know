const Brand = require("../models/Brand");

const createBrandService = async data => await Brand.create(data);

const getBrandsService = async () =>
	await Brand.find({}).select("-products -suppliers");

const getBrandByIdService = async id => await Brand.findOne({ _id: id });

module.exports = { createBrandService, getBrandsService, getBrandByIdService };
