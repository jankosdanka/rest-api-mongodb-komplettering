const express = require('express')
const router = express.Router()
const { getAllClasses, getAllActiveClasses } = require('../controllers/classController')

router.get('/', getAllClasses)
router.get('/activeclasses', getAllActiveClasses)

module.exports = router
