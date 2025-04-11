const models = require('../models')

class UserService {
    constructor() {
        this.model = models.User
    }


    async findAll(filter) {
        return await this.model.findAll(filter)
    }

    async findOne(filter) {
        return await this.model.findOne(filter)
    }

    async create(id, user_info) {
        const account = await this.model.findOne({
            where: {
                id: id
            }
        })
        if (!account)
            return await this.model.create({id : id,...user_info})
        else return await this.model.update(user_info, {
            where: {
                id:id
            }
        })
    }
    async delete(id) {
        return await this.model.destroy({where: {
            id: id
        }})
    }
}


module.exports = new UserService()