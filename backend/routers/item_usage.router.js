const express = require('express')
const item_usage = require('../controllers/item_usage.controller')


const item_usage_router = express.Router()

item_usage_router.route('/')
    .get(item_usage.findAll)
    .post(item_usage.create)
item_usage_router.route("/:id")
    .get(item_usage.findOne)
    .delete(item_usage.delete)
    .patch(item_usage.update)

module.exports = item_usage_router