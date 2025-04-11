const express = require('express')
const multer = require('multer')
const account = require('../controllers/account.controller')
const upload = multer({ dest: 'uploads/' })

const account_router = express.Router()

account_router.route('/')
    .get(account.findAll)
    .post(upload.single(),account.create)

account_router.route('/login')
    .post(upload.single(),account.login)

account_router.route('/count')
    .get(account.count)

account_router.route('/:id/role')
    .patch(account.changeRole)

account_router.route('/:id')
    .get(account.findOne)
    .patch(account.updatePassword)
    .delete(account.delete)



module.exports = account_router