const jwt = require("jsonwebtoken");

const generateToken = userInfo => {
	const payload = {
		email: userInfo.email,
		rote: userInfo.role,
	};

	const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
		expiresIn: "7days",
	});

	return token;
};

module.exports = { generateToken };
