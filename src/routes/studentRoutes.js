const express = require('express')
const router = express.Router()
const {
	getAllStudents,
	addStudentToClass,
	updateStudentById,
	deleteStudentById,
} = require('../controllers/studentController')

router.get('/', getAllStudents)

router.post('/', addStudentToClass)

router.put('/:studentId', updateStudentById)

router.delete('/:studentId', deleteStudentById)

module.exports = router
