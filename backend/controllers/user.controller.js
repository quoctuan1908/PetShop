const userService = require("../services/user.service")
const  UserService  = require("../services/user.service")

exports.findAll = async (req,res,next) => {
    const accounts = await UserService.findAll()
    return res.send(accounts)
}
exports.findOne = async (req,res,next)=> {
    try {
        const account = await UserService.findOne({where:{id: req.params.id}})
        if (!account)
            return res.json({statusCode: 404,message: "User not found"})
        return res.json(account)
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
        const result = await userService.create(req.params.id, req.body)
        return res.json(result)
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: "Cannot connect to server"
        })
    }
}