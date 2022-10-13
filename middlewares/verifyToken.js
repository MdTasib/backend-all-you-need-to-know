const jwt = require("jsonwebtoken");
const { promisify } = require("util");

/**
 * 1. CHECK IF TOKEN EXISTS
 * 2. IF NOT TOKEN SEND RES
 * 3. DECODE THE TOKEN
 * 4. IF VALID NEXT
 */

const verifyToken = async (req, res, next) => {
	try {
		const token = req.headers?.authorization?.split(" ")[1];

		if (!token) {
			return res.status(401).json({
				status: "Failed",
				error: "You are not logged in",
			});
		}

		const decoded = await promisify(jwt.verify)(
			token,
			process.env.TOKEN_SECRET
		);

		// GET FULL USER DETAILS
		// const user = User.findOne({ email: decoded.email })
		// req.user = user;

		req.user = decoded;

		next();
	} catch (error) {
		res.status(403).json({
			status: "fail",
			error: "Invalid token",
		});
	}
};

module.exports = verifyToken;
