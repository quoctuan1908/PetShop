const models = require("../models");

class PetService {
    constructor() {
        this.model = models.Pet
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
    async create(pet_information, image) {
        const result = await this.model.create({...pet_information, image:"uploads/images/pets/" +image})
        return result
    }
    async update(id, pet) {
        return await this.model.update(pet, {where: {
            id: id
        }})
    } 
    async updateQuantity(quantity, id) {
        return await this.model.update({quantity: quantity}, {where: {
            id: id
        }})
    }
    async count() {
        return await this.model.count()
    }
}

module.exports = new PetService()