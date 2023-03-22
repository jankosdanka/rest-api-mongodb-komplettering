const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
	namn: {
		type: String,
	},
	email: {
		type: String,
	},
	betalningsstatus: {
		type: String,
		default: 'pending',
	},
	roll: {
		type: String,
	},
	klass: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'klass',
	},
})

module.exports = mongoose.model('Student', StudentSchema)
