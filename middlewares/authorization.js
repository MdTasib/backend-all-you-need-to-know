const authorization = (...rote) => {
	return (req, res, next) => {
		const userRole = req.user.role;

		if (rote.includes(userRole)) {
			return res.status(403).json({
				status: "Failed",
				error: "you are not authorized to access this",
			});
		}

		next();
	};
};

module.exports = authorization;
