const express = require('express')
const supplier = require('../controllers/supplier.controller')


const supplier_router = express.Router()

supplier_router.route('/')
    .get(supplier.findAll)
    .post(supplier.create)

supplier_router.route('/count')
    .get(supplier.count)


supplier_router.route('/:id')
    .get(supplier.findOne)
    .patch(supplier.update)
    .delete(supplier.delete)
module.exports = supplier_router