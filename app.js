const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
// const { connectToServer } = require("./utils/dbConnect");

// MIDDLEWARES
app.use(express.json());
app.use(cors());

// DB CALL
// connectToServer(err => {
// 	if (!err) {
// 		app.listen(5000, () => console.log("Port 5000 server running"));
// 	} else {
// 		console.log("DB DON'T CONNECTED");
// 	}
// });

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

// MODAL
const Product = mongoose.model("Product", productSchema);

app.get("/", (req, res) => {
	res.send("Route is working! YaY!");
});

app.post("/api/v1/product", (req, res, next) => {
	const product = new Product(req.body);

	product.save();
});

// NOT FOUND ROUTE
app.all("*", (req, res) => {
	res.send("NO route found.");
});

module.exports = app;
