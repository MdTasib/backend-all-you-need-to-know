const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const productRouter = require("./routes/product.route");

// MIDDLEWARES
app.use(express.json());
app.use(cors());

// ROUTES
app.use("/api/v1/product", productRouter);

app.get("/", (req, res) => {
	res.send("Route is working! YaY!");
});

// NOT FOUND ROUTE
app.all("*", (req, res) => {
	res.send("NO route found.");
});

module.exports = app;
