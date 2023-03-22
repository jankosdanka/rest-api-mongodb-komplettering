const mongoose = require('mongoose')

const TermSchema = new mongoose.Schema({
	namn: {
		type: String,
	},
	dansstil: {
		type: String,
	},
	start: {
		type: String,
	},
	slutar: {
		type: String,
	},
	tid: {
		type: String,
	},
	klasstidIMinuter: {
		type: Number,
	},
	pris: {
		type: Number,
	},
	klassLedare: {
		type: Array,
	},
	aktiv: {
		type: Boolean,
		required: true,
	},
	students: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Student',
		},
	],
	amountOfStudents: {
		type: Number,
		default: 0,
	},
})

module.exports = mongoose.model('Term', TermSchema)
