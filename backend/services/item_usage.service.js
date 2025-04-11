const models = require('../models')

class ItemUsageService {
    constructor() {
        this.model = models.ItemUsage
    }

    async findAll(filter) {
        return await this.model.findAll(filter)
    }

    async findOne(filter) {
        return await this.model.findOne(filter)
    }
    async create(item) {
        const result = await this.model.create(item)
        return result
    }
    async delete(ItemId) {
        const result = await this.model.destroy({
            where: {
                PetItemId: ItemId
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
}


module.exports = new ItemUsageService()