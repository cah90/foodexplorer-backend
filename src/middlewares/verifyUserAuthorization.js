const AppError = require("../utils/AppError")

function verifyUserAuthorization(roleToVerify) {
	return (req, res, next) => {
		const { role } = req.user

		console.log(role)

		if (!roleToVerify.includes(role)) {
			console.log("Entrei aqui")
			throw new AppError("Unauthorized", 401)
		}

		return next()
	}
}

module.exports = verifyUserAuthorization
