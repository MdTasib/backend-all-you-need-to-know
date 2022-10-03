const Store = require("../models/Store");

const createStoreService = async data => await Store.create(data);

const getStoreService = async () => await Store.find({});

const getStoreByIdService = async id => await Store.findOne({ _id: id });

module.exports = { createStoreService, getStoreService, getStoreByIdService };
