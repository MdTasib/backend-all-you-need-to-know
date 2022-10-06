const User = require("../models/User");

const singupService = async userInfo => await User.create(userInfo);

module.exports = { singupService };
