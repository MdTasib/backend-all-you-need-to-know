const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");

const app = require("./app");

// DATABASE CONNECTION
mongoose
	.connect(process.env.DATABASE, {
		useNewUrlParser: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Database connection is successfully".green.bold);
	});

// SERVER RUNING PORT
const port = process.env.PORT || 8080;

app.listen(port, () => {
	console.log(`App is running on port ${port}`.yellow.bold);
});
