const models = require('../models')
const {Op} =require('sequelize') 

class OrderService {
    constructor() {
        this.model = models.Order
    }

    async findAll(filter) {
        return await this.model.findAll(filter)
    }

    async findAllHistory(filter) {
        return await this.model.findAll(filter,{attributes: { exclude: ['createdAt'] }})
    }

    async findByUser(filter) {
        return await this.model.findOne(filter)
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
    async create(order) {
        const result = await this.model.create(order)
        return result
    }
    async createMany(orders,address) {
        orders.forEach(async (order) => {
            delete order['name']
            order['address'] = address
            await this.create(order)
        })
    }
    async accept(id, staff_id) {
        return await this.model.update({status: "DELIVERING", staff_id: staff_id}, {where: {
            id: id
        }})
    }
    async finish(id, staff_id) {
        console.log("Hello here")
        return await this.model.update({status: "DONE", staff_id: staff_id}, {where: {
            id: id
        }})
    }
    async cancel(id, staff_id) {
        return await this.model.update({status: "FAILED", staff_id: staff_id}, {where: {
            id: id
        }})
    }
    async countProcessingOrder() {
        return await this.model.count({where: {status: "PROCESSING"}})
    }
}


module.exports = new OrderService()