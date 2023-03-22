const Term = require('../models/term')
const { NotFoundError, BadRequestError } = require('../utils/errors')

exports.getAllClasses = async (req, res, next) => {
	const classes = await Term.find()

	if (!classes) {
		throw new NotFoundError('Hittar inga klasser')
	}
	return res.json(classes)
}

exports.getAllActiveClasses = async (req, res, next) => {
	try {
		const activeClass = await Term.find({
			aktiv: true,
		})

		if (!activeClass.length === true) {
			throw new NotFoundError('Denna klass är tyvärr inte aktiv..')
		}
		return res.json(activeClass)
	} catch (error) {}
}
