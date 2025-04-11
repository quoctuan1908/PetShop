const  AccountService  = require("../services/account.service")
const jwt = require("jsonwebtoken")
const config = require('../config')
const userService = require("../services/user.service")

exports.findAll = async (req,res,next) => {
    try {
        console.log("This is findAll")
        const accounts = await AccountService.findAll({attributes: {exclude: ['password']}})
        console.log(accounts)
        return res.status(200).json(accounts)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            statusCode: 500,
            message: "Cannot connect to server"
        })
    }
}
exports.create = async (req,res,next) => {
    try {
        console.log(req.body)
        const result = await AccountService.create(req.body.account.username, req.body.account.password,req.body.account.role)
        return res.json(result)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            statusCode: 500,
            message: "Cannot connect to server"
        })
    }
}
exports.findOne = async (req,res,next)=> {
    try {
        const account = await AccountService.findOne({where:{id: req.params.id}})
        if (!account)
            return res.json({statusCode: 404,message: "Account not found"})
        return res.json(account)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            statusCode: 500,
            message: "Cannot connect to server"
        })
    }
}
exports.login = async (req,res,next) => {
    try {
        const login = await AccountService.login(req.body.account.username, req.body.account.password)
        if (login.statusCode != 200) 
            return res.json(login)
        const user = await userService.findOne({where: {id: login.account.id}})
        console.log(user)
        const token = jwt.sign({ payload: {account: login.account, user: user} }, config.key.jwt_key,{
            algorithm: 'HS256',
            allowInsecureKeySizes: true,
            expiresIn: 86400, // 24 hours
        });
        
        return res.json({
            statusCode: 200,
            message: "Login successfully.",
            token: token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Cannot connect to server"
        })   
    }
}
exports.updatePassword = async (req,res,next) => {
    try {
        const updatedPassword = await AccountService.updatePassword(req.body.account.username, req.body.account.oldPassword, req.body.account.newPassword)
        if (updatedPassword.statusCode != 200)
            return res.json(updatedPassword)
        return res.json(updatedPassword)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            statusCode: 500,
            message: "Cannot connect to server"
        })
    }
}

exports.delete = async (req,res,next) => {
    try {
        const result = await AccountService.delete(req.params.id)
        if (!result) {
            console.log(result)
            return res.json(result)
        }
        return res.json(result)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            statusCode: 500,
            message: "Cannot connect to server"
        })
    }
}

exports.changeRole = async (req,res,next) => {
    try {
        console.log(req.body.role)
        const result = await AccountService.changeRole(req.params.id, req.body.role)
        console.log(result)
        return res.json(result)
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: "Cannot connect to server"
        })
    }
}

exports.count = async (req,res,next) => {
    try {
        console.log()
        const result = await AccountService.count()
        console.log(result)
        return res.json(result)
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: "Cannot connect to server"
        })
    }
}