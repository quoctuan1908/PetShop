const express = require('express')
const pet = require('../controllers/pet.controller')
const { uploadsPet } = require('../middleware/uploadsFile.middleware')


const pet_router = express.Router()

pet_router.route("/")
    .get(pet.findAll)
    .post(uploadsPet.single('file'),pet.create)

pet_router.route('/count')
    .get(pet.count)


pet_router.route("/search/:search")
    .get(pet.findAll)

pet_router.route("/species/:id")
    .get(pet.findWithSpeciesId)

pet_router.route("/:id")
    .get(pet.findOne)
    .delete(pet.delete)
    .patch(pet.update)

module.exports = pet_router
