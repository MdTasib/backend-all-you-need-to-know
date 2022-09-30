const Category = require("../models/Category");

const getCategoriesService = async () => await Category.find({});

const createCategoryService = async data => await Category.create(data);

module.exports = { getCategoriesService, createCategoryService };
