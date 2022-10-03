const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

// SCHEMA DESIGN
const productSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please provide a name for this product."],
			trim: true,
			unique: [true, "Product must be unique"],
			lowercase: true,
			minLenght: [3, "Name must be al last 3 characters."],
			maxLenght: [100, "Name is too large"],
		},
		description: {
			type: String,
			required: true,
		},
		unit: {
			type: String,
			required: true,
			enum: {
				values: ["kg", "litre", "pcs", "bag"],
				message: "unit value can't be {VALUE}, must be kg/litre/pcs/bag",
			},
		},
		imageURLS: [
			{
				type: String,
				required: true,
				validate: {
					validator: values => {
						if (!Array.isArray(value)) {
							return false;
						}

						let isValid = true;

						values.forEach(url => {
							if (!validator.isURL(url)) {
								isValid = false;
							}
						});

						return isValid;
					},
					message: "Please provide a valid image urls",
				},
			},
		],
		category: {
			type: String,
			required: true,
		},
		brand: {
			name: {
				type: String,
				required: true,
			},
			id: {
				type: ObjectId,
				ref: "Brand",
				required: true,
			},
		},
	},
	{
		timestamps: true,
	}
);

// MONGOOSE MIDDLEWARES FOR SAVEING DATA: PRE / POST
productSchema.pre("save", function (next) {
	console.log("Before product created".bgGreen);

	if (this.quantity === 0) {
		this.status = "out-of-stock";
	}
	next();
});

// MODAL
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
