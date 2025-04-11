const express = require('express')
const multer = require('multer')
const user = require('../controllers/user.controller')
const upload = multer({ dest: 'uploads/' })

const user_router = express.Router()

user_router.route('/')
    .get(user.findAll)
user_router.route('/:id')
    .post(user.create)
    .get(user.findOne)


module.exports = user_router