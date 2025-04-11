const models = require('../models')

class SpeciesService {
    constructor() {
        this.model = models.Species
    }

    async findAll(filter) {
        return await this.model.findAll(filter)
    }

    async findOne(filter) {
        return await this.model.findOne(filter)
    }
    async delete(id) {
        const result = await this.model.destroy({
            where: {
                id: id
            }
        })
        console.log(result)
        return result
    }
    async update(id, species) {
        return await this.model.update(species, {where: {
            id: id
        }})
    }
    async create(species,image) {
        return await this.model.create({...species, image: "uploads/images/species/" + image})
    }
}


module.exports = new SpeciesService()