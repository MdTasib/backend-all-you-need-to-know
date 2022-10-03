const {
	getCategoriesService,
	createCategoryService,
} = require("../services/category.services");

const getCategories = async (req, res) => {
	try {
		const result = await getCategoriesService();

		res.status(200).json({
			status: "success",
			data: result,
		});
	} catch (error) {
		res.status(400).json({
			status: "field",
			message: "Couldn't get category",
			error: error.message,
		});
	}
};

const createCategory = async (req, res) => {
	try {
		const result = await createCategoryService(req.body);

		res.status(200).json({
			status: "success",
			message: "Category created successfully",
		});
	} catch (error) {
		res.status(400).json({
			status: "field",
			message: "Couldn't get category",
			error: error.message,
		});
	}
};

module.exports = { getCategories, createCategory };
