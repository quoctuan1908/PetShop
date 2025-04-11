const express = require('express')
const staff = require('../controllers/staff.controller')

const staff_router = express.Router()

staff_router.route('/')
    .get(staff.findAll)
staff_router.route('/:id')
    .post(staff.create)
    .get(staff.findOne)


module.exports = staff_router