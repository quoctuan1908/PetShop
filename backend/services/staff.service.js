const models = require('../models')
const { encryptPassword } = require('../utils')

class StaffService {
    constructor() {
        this.model = models.Staff
    }

    async findAll(filter) {
        return await this.model.findAll(filter)
    }

    async findOne(filter) {
        return await this.model.findOne(filter)
    }

    async create(username, password, role) {
        const account = await this.model.findOne({
            where: {
                username: username
            }
        })
        if (account)
            return {
                statusCode: 403,
                message: "Account is already existed."
            }
        const hashedPassword = await encryptPassword(password);
        await this.model.create({
            username: username,
            password: hashedPassword,
            role: role
        })
        return {
            statusCode: 200,
            message: "Account is created.",
            account: account
        }
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
    async update(id, staff) {
        return await this.model.update(staff, {where: {
            id: id
        }})
    }    
}


module.exports = new StaffService()