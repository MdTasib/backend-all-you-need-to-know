const User = require("../models/User");

const singupService = async userInfo => await User.create(userInfo);

const findUserByEmail = async email => await User.findOne({ email });

module.exports = { singupService, findUserByEmail };
