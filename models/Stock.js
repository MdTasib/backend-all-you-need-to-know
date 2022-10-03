const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const validator = require("validator");

// STOCK SCHEMA DESIGN
const stockSchema = mongoose.Schema(
	{
		productId: {
			type: ObjectId,
			required: true,
			ref: "Product",
		},
		name: {
			type: String,
			required: [true, "Please provide a name for this product."],
			trim: true,
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
		imageURLs: [
			{
				type: String,
				required: true,
				validate: [validator.isURL, "Please provide a valid url(s)"],
			},
		],
		// imageURLS: [
		// 	{
		// 		type: String,
		// 		required: true,
		// 		validate: {
		// 			validator: values => {
		// 				if (!Array.isArray(value)) {
		// 					return false;
		// 				}

		// 				let isValid = true;

		// 				values.forEach(url => {
		// 					if (!validator.isURL(url)) {
		// 						isValid = false;
		// 					}
		// 				});

		// 				return isValid;
		// 			},
		// 			message: "Please provide a valid image urls",
		// 		},
		// 	},
		// ],
		price: {
			type: Number,
			required: true,
			min: [0, "Product price can't be nagetive"],
		},
		quantity: {
			type: Number,
			required: true,
			min: [0, "Product quantity can't be nagetive"],
		},
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
		status: {
			type: String,
			enum: {
				values: ["in-stock", "out-of-stock", "discontinued"],
				message: "status can't be {VALUE}",
			},
		},
		store: {
			name: {
				type: String,
				trim: true,
				required: [true, "Please provide a store name"],
				lowercase: true,
				enum: {
					values: [
						"dhaka",
						"chattogram",
						"rajshahi",
						"sylhet",
						"khulna",
						"barishal",
						"rangpur",
						"mymensingh",
					],
					message: "{VALUE} is not a valid name",
				},
			},
			id: {
				type: ObjectId,
				required: true,
				ref: "Store",
			},
		},
		suppliedBy: {
			name: {
				type: String,
				trim: true,
				required: [true, "Please provide a supplier name"],
			},
			id: {
				type: ObjectId,
				ref: "Supplier",
			},
		},
		sellCount: {
			type: Number,
			default: 0,
			min: 0,
		},
	},
	{
		timestamps: true,
	}
);

// MONGOOSE MIDDLEWARES FOR SAVEING DATA: PRE / POST
stockSchema.pre("save", function (next) {
	console.log("Before product created".bgGreen);

	if (this.quantity === 0) {
		this.status = "out-of-stock";
	}
	next();
});

// MODAL
const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
