const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

// CATEGORY SCHEMA
const categorySchema = mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: [true, "Please provide a valid category name"],
			lowercase: true,
			unique: true,
		},
		description: String,
		imageURL: {
			type: String,
			validate: [validator.isURL, "Please provide a valid URL"],
		},
	},
	{ timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
