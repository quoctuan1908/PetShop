const models = require('../models')

class PetItemService {
    constructor() {
        this.model = models.PetItem
    }

    async findAll(filter) {
        return await this.model.findAll(filter)
    }

    async findOne(filter) {
        return await this.model.findOne(filter)
    }

    async create(item,image) {

        const result = await this.model.create({...item, image: "uploads/images/items/" +image})
        return result
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
    async update(id, item) {
        return await this.model.update(item, {where: {
            id: id
        }})
    }
    async updateQuantity(id, quantity) {
        return await this.model.update({quantity: quantity}, {where: {
            id: id
        }})
    }
    async count() {
        return await this.model.count()
    }
}


module.exports = new PetItemService()