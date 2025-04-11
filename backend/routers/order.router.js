const express = require('express')
const order = require('../controllers/order.controller')


const order_router = express.Router()

order_router.route('/')
    .get(order.findAll)
    .post(order.create)
    
order_router.route('/history')
    .get(order.findHistory)

order_router.route('/count/processing')
    .get(order.countProcessingOrder)

order_router.route('/:id/cancel')
    .patch(order.cancel)

order_router.route('/:id/finish')
    .patch(order.finish)

order_router.route("/:id")
    .get(order.findByUser)
    .delete(order.delete)
    .patch(order.update)

module.exports = order_router