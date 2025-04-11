const express = require('express')
const species = require('../controllers/species.controller')
const { uploadsSpecies } = require('../middleware/uploadsFile.middleware')


const species_router = express.Router()

species_router.route('/')
    .get(species.findAll)
    .post(uploadsSpecies.single('file'), species.create)

species_router.route('/:id')
    .get(species.findOne)
    .patch(species.update)

module.exports = species_router