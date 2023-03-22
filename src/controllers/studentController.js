const Student = require('../models/student')
const Term = require('../models/term')
const { NotFoundError, BadRequestError } = require('../utils/errors')
const mongoose = require('mongoose')

exports.getAllStudents = async (req, res, next) => {
	const students = await Student.find()
	if (!students) {
		throw new NotFoundError('Hittar inga studenter')
	}
	return res.json(students)
}

exports.addStudentToClass = async (req, res, next) => {
	try {
		const namn = req.body.namn
		const email = req.body.email
		const betalningsstatus = req.body.betalningsstatus
		const roll = req.body.roll
		const klass = req.body.klass

		let classId = await Term.findById(klass)

		if (!classId) {
			return res.status(400).json({ message: 'Klassen finns inte!' })
		}

		if (!namn || !email || !betalningsstatus || !roll || !klass) {
			return res.status(400).json({ message: 'Ofyllda fält! Vänligen fyll i alla fält.' })
		}

		const totalStudents = await Student.countDocuments({ klass: klass, roll: roll })

		if (roll == 'följare' && totalStudents >= 10) {
			return res
				.status(400)
				.json({ message: 'Denna klass är full med följare! Du får gärna söka till våra lediga klasser!' })
		}
		if (roll == 'ledare' && totalStudents >= 10) {
			return res.status(400).json({ message: 'Denna klass är full med ledare! Du får gärna söka till våra lediga klasser!' })
		}

		if (!classId.aktiv) {
			return res.status(400).json({ message: 'Denna klass är inte aktiv! Sök gärna till våra aktiva klasser!' })
		}
		const newStudent = await Student.create({
			namn: namn,
			email: email,
			betalningsstatus: betalningsstatus.pending,
			roll: roll,
			klass: klass,
		})

		const savedStudent = await newStudent.save()

		res.json(savedStudent)
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

exports.updateStudentById = async (req, res, next) => {
	try {
		const studentId = req.params.studentId

		const newNamn = req.body.namn
		const newEmail = req.body.email
		const newBetalningsstatus = req.body.betalningsstatus

		const student = await Student.findById(studentId)
		if (!student) throw new NotFoundError('That student does not exist...')

		if (newNamn) student.namn = newNamn
		if (newEmail) student.email = newEmail
		if (newBetalningsstatus) student.betalningsstatus = newBetalningsstatus

		const updatedStudent = await student.save()
		return res.status(200).json(updatedStudent)
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

exports.deleteStudentById = async (req, res, next) => {
	const studentId = req.params.studentId

	const student = await Student.findById(studentId)

	if (!student) throw new Error('denna student finns ej!')

	await student.delete()

	return res.sendStatus(204)
}
