const express = require('express')
const router = express.Router()

const classRoutes = require('./classRoutes')
const studentRoutes = require('./studentRoutes')

router.use('/classes', classRoutes)
router.use('/students', studentRoutes)

module.exports = router
