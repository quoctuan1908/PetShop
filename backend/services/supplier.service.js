const models = require('../models')

class SupplierService {
    constructor() {
        this.model = models.Supplier
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
    async create(supplier) {
        return await this.model.create(supplier)
    }
    async update(id, supplier) {
        return await this.model.update(supplier, {where: {
            id: id
        }})
    }
    async count() {
        return await this.model.count()
    }
}


module.exports = new SupplierService()