/**
 *
 * WITHOUT MONGOOSE
 *
 */

const { MongoClient } = require("mongodb");
const connectionString = process.env.DATABASE;
const client = new MongoClient(connectionString, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
	connectToServer: function (callback) {
		client.connect(function (err, db) {
			if (err || !db) {
				return callback(err);
			}

			dbConnection = db.db("acc-inventory-management");
			console.log("Successfully connected to MongoDB.");

			return callback();
		});
	},

	getDB: function () {
		return dbConnection;
	},
};

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://acc-inventory:<password>@cluster0.aycinux.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
