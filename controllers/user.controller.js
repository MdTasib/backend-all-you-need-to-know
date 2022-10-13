const { singupService, findUserByEmail } = require("../services/user.services");
const { sendMailWithMailgun } = require("../utils/email");
const { generateToken } = require("../utils/token");

const singup = async (req, res) => {
	try {
		const user = await singupService(req.body);

		const mailData = {
			to: [user.email],
			subject: "Verify your account",
			text: "Thank you",
		};

		sendMailWithMailgun(mailData);

		res.status(200).json({
			status: "success",
			message: "Singup successfully",
		});
	} catch (error) {
		res.status(500).json({
			status: "field",
			message: "Couldn't singup",
			error: error.message,
		});
	}
};

module.exports = { singup };

/**
 * 1. CHECK IF EMAIL AND PASSWORD ARE GIVEN
 * 2. LOAD USER WITH EMAIL
 * 3. IF NOT USER SEND RES
 * 4. COMPARE PASSWORD
 * 5. IF PASSWORD NOT CORRENT SEND RES
 * 6. CHECK IF USER IS ACTIVE
 * 7. IF NOT ACTIVE SEND RES
 * 8. GENERATE TOKEN
 * 9. SEND USER AND TOKEN
 */

const login = async (req, res) => {
	try {
		// CHECK IF EMAIL AND PASSWORD ARE GIVEN
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(401).json({
				status: "Failed",
				error: "Please, provide your credentials",
			});
		}

		// FIND USER BY EMAIL
		const user = await findUserByEmail(email);

		if (!user) {
			return res.status(401).json({
				status: "Failed",
				error: "No user found, please create an account",
			});
		}

		// COMPARE PASSWORD
		const isPasswordValid = user.comparePassword(password, user.password);

		if (!isPasswordValid) {
			return res.status(403).json({
				status: "failed",
				error: "Password is not correct",
			});
		}

		// CHECK IF USER IS ACTIVE
		if (user.status !== "active") {
			return res.status(401).json({
				status: "Failed",
				error: "Your account is not active yet",
			});
		}

		const token = generateToken(user);

		// REMOVE PASSWORD
		const { password: pwd, ...others } = user.toObject();

		res.status(200).json({
			status: "success",
			message: "login successfully",
			data: { others, token },
		});
	} catch (error) {
		res.status(500).json({
			status: "field",
			message: "Couldn't login",
			error: error.message,
		});
	}
};

const getMe = async (req, res) => {
	try {
		const user = await findUserByEmail(req.user?.email);

		res.status(200).json({
			status: "success",
			data: user,
		});
	} catch (error) {
		res.status(500).json({
			status: "fail",
			error,
		});
	}
};

module.exports = { singup, login, getMe };

// {
// 	"role": "admin",
// 	"status": "active",
// 	"email": "programmer442@gmail.com",
// 	"password": "test@TEST123",
//  "confirmPassword": "test@TEST123",
// 	"firstName": "md",
// 	"lastName": "tasib",
// 	"shippingAddress": "fatick",
// 	"imageURL": "https://i.ibb.co/WnFSs9Y/unnamed.webp"
// }
