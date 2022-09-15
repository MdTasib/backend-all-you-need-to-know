const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const colors = require("colors");
// const { connectToServer } = require("./utils/dbConnect");

// MIDDLEWARES
app.use(express.json());
app.use(cors());

// SCHEMA DESIGN
const productSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please provide a name for this product."],
			trim: true,
			unique: [true, "Product must be unique"],
			minLenght: [3, "Name must be al last 3 characters."],
			maxLenght: [100, "Name is too large"],
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: [true, "Please provide a price for this product"],
			min: [0, "Price can't be negative."],
		},
		unit: {
			type: String,
			required: true,
			enum: {
				values: ["kg", "litre", "pcs"],
				message: "unit value can't be {VALUE}, must be kg/litre/pcs",
			},
		},
		quantity: {
			type: Number,
			required: true,
			min: [0, "Quantity can't be negative."],
			validate: {
				validator: value => {
					const isInteger = Number.isInteger(value);
					if (isInteger) {
						return true;
					} else {
						return false;
					}
				},
			},
			message: "Quantity must be an integer.",
		},
		status: {
			type: String,
			enum: {
				values: ["in-stock", "out-of-stock", "discontinued"],
				message: "status can't be {VALUE}",
			},
		},
		// supplier: {
		// 	type: mongoose.Schema.Types.ObjectId,
		// 	ref: "Supplier",
		// },
		// categories: [
		// 	{
		// 		name: {
		// 			type: String,
		// 			required: true,
		// 		},
		// 		_id: mongoose.Schema.Types.ObjectId,
		// 	},
		// ],
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

// MONGOOSE MIDDLEWARES FOR SAVEING DATA: PRE / POST
productSchema.post("save", function (doc, next) {
	console.log("After product created".bgGreen);
	next();
});

// INSTANCE METHODS - OPTIONAL
productSchema.methods.logger = function () {
	console.log(`Data saved for ${this.name}`.bgGreen);
};

// MODAL
const Product = mongoose.model("Product", productSchema);

app.post("/api/v1/product", async (req, res, next) => {
	try {
		// FIRST WAY FOR THE POST DATA - ( SAVE ) METHOD
		const product = new Product(req.body);
		const result = await product.save();

		// INSTANCE METHODS - OPTIONAL
		result.logger();

		// SECOND WAY FOR THE POST DATA - ( CREATE ) METHOD
		// const result = await Product.create(req.body);

		res.status(200).json({
			status: "success",
			message: "Data inserted successfully",
			data: result,
		});
	} catch (error) {
		res.status(400).json({
			status: "Failed",
			message: "Data is't inserted",
			error: error.message,
		});
	}
});

app.get("/", (req, res) => {
	res.send("Route is working! YaY!");
});

// NOT FOUND ROUTE
app.all("*", (req, res) => {
	res.send("NO route found.");
});

module.exports = app;
