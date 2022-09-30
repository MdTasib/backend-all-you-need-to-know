const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(cors());

// ROUTES
const productRouter = require("./routes/product.route");
const brandRouter = require("./routes/brand.route");
const storeRouter = require("./routes/store.route");
const categoryRouter = require("./routes/category.route");

// ROUTES USE
app.use("/api/v1/product", productRouter);
app.use("/api/v1/brand", brandRouter);
app.use("/api/v1/store", storeRouter);
app.use("/api/v1/category", categoryRouter);

app.get("/", (req, res) => {
	res.send("Route is working! YaY!");
});

// NOT FOUND ROUTE
app.all("*", (req, res) => {
	res.send("NO route found.");
});

module.exports = app;
