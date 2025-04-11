const models = require('../models')
const { encryptPassword, comparePassword } = require('../utils')
const staffService = require('./staff.service')
const userService = require('./user.service')

class AccountService {
    constructor() {
        this.model = models.Account
    }

    async findAll(filter) {
        return await this.model.findAll(filter)
    }

    async findOne(filter) {
        return await this.model.findOne(filter)
    }

    async create(username, password, role) {
        if (!role) {
            role = "USER"
        }
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
        const createdAccount = await this.model.create({
            username: username,
            password: hashedPassword.password,
            role: role
        })
        if (role != "ADMIN") {
            await userService.create(createdAccount.id, {
                name: "",
                gender: true
            })
            // await staffService.create(createdAccount.id, {
            //     name: ""
            // })
        }
        return {
            statusCode: 200,
            message: "Account is created.",
            account: createdAccount
        }
    }

    async updatePassword(username, oldPassword, newPassword) {
        const account = await this.model.findOne({where:{username:username}})
        if (!account) {
            return {
                statusCode: 404,
                message: "Account not found."
            }
        }
        const isCorrectOldPassword = await comparePassword(oldPassword, account.password)
        if (!isCorrectOldPassword) return {
            statusCode: 401,
            message: "Authenticate Password Incorrect."
        }
        const hashedNewPassword = await encryptPassword(newPassword)
        await this.model.update({password: hashedNewPassword}, {
            where: {
                username: username
            }
        })
        return {
            statusCode: 200,
            message: "Change password successfully.",

        }
    }

    async delete(id) {
        const result = await this.model.destroy({
            where: {
                id: id
            }
        })
        await userService.delete(id)
        console.log(result)
        return result
    }

    async login(username, password) {
        const account = await this.model.findOne({where:{username: username}})
        console.log(account)
        if (!account) return {
            statusCode: 404,
            message: "Account not found."
        }
        const isCorrectPassword = await comparePassword(password, account.password)
        if (!isCorrectPassword) return {
            statusCode: 401,
            message: "Password incorrect."
        }
        account['password'] = ''
        return {
            statusCode: 200,
            message: "Login successfully.",
            account: account
        }
    }

    async changeRole(id, role) {
        const account = await this.model.findOne({where: {id:id}})
        await account.update({role:role})
        await account.save()
        return account
    }

    async count() {
        return await this.model.count()
    }
}


module.exports = new AccountService()