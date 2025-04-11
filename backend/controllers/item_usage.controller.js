const  ItemUsageService  = require("../services/item_usage.service")

exports.findAll = async (req,res,next) => {
    const items_usage = await ItemUsageService.findAll({attributes: {exclude: ['createdAt','updatedAt']}})
    return res.send(items_usage)
}
exports.create = async (req,res,next) => {
    try {
        console.log(req.body.item)
        const result = await ItemUsageService.create(req.body.item)
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
        const item = await ItemUsageService.findOne({where:{id: req.params.id}})
        if (!item)
            return res.json({statusCode: 404,message: "Item not found"})
        return res.json(item)
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
        const result = await ItemUsageService.delete(req.params.id)
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
exports.update = async (req,res,next) => {
     try {
        const item = await ItemUsageService.update(req.params.id, req.body)
        if (!item)
            return res.json({statusCode: 404,message: "Item not found"})
        return res.json({statusCode: 200,message: "Item usage updated"})
    } catch (error) {
         console.log(error)
        return res.status(500).json({
            statusCode: 500,
            message: "Cannot connect to server"
        })
    }
}