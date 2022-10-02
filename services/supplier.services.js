const Supplier = require("../models/Supplier");

const getSuppliersService = async () => await Supplier.find({});

const createSupplierService = async data => await Supplier.create(data);

const getSupplierByIdService = async id => {
	const supplier = await Supplier.findOne({ _id: id });
	return supplier;
};

const updateSupplierService = async (id, data) => {
	const result = await Supplier.updateOne({ _id: id }, data, {
		runValidators: true,
	});
	return result;
};

module.exports = {
	createSupplierService,
	getSuppliersService,
	getSupplierByIdService,
	updateSupplierService,
};
