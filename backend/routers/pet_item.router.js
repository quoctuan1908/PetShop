const express = require('express')
const pet_item = require('../controllers/pet_item.controller')
const { uploadsItem } = require('../middleware/uploadsFile.middleware')


const pet_item_router = express.Router()

pet_item_router.route('/')
    .get(pet_item.findAll)
    .post(uploadsItem.single('file'),pet_item.create)

pet_item_router.route('/count')
    .get(pet_item.count)


pet_item_router.route('/search/:search')
    .get(pet_item.findAll)

pet_item_router.route("/species/:id")
    .get(pet_item.findWithSpeciesId)

pet_item_router.route("/:id")
    .get(pet_item.findOne)
    .delete(pet_item.delete)
    .patch(pet_item.update)

module.exports = pet_item_router