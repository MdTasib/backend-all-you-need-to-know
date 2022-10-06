const { singupService } = require("../services/user.services");

const singup = async (req, res) => {
	try {
		const user = await singupService(req.body);

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
