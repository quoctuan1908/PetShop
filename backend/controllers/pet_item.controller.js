const  petItemService  = require("../services/pet_item.service")

exports.findAll = async (req,res,next) => {
    try {
        if (req.params.search != "*") {
            return res.json(await petItemService.findAll({where: {item_name: req.params.search}}))
        }
        const items = await petItemService.findAll()
        return res.status(200).json(items)
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
        console.log(req.file)
        const result = await petItemService.create(JSON.parse(req.body.item), req.file.filename)
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
        const item = await petItemService.findOne({where:{id: req.params.id}})
        if (!item)
            return res.json({statusCode: 404,message: "Item not found"})
        return res.json(item)
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: "Cannot connect to server"
        })
    }

}
exports.delete = async (req,res,next) => {
    try {
        const result = await petItemService.delete(req.params.id)
        if (!result) {
            return res.json({statusCode: 404,message: "Delete item failed"})
        }
        return res.json({statusCode: 200,message: "Delete item successfully"})
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: "Cannot connect to server"
        })
    }
}
exports.update = async (req,res,next) => {
     try {
        const item = await petItemService.update(req.params.id, req.body)
        if (!item)
            return res.json({statusCode: 404,message: "Item not found"})
        return res.json({statusCode: 200,message: "Update item successfully"})
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: "Cannot connect to server"
        })
    }
}
exports.findWithSpeciesId = async (req,res,next) => {
    try {
        console.log("hello from here")
        const items = await petItemService.findAll({where:{species_id:req.params.id}})
        console.log(items)
        return res.status(200).json(items)
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
        const result = await petItemService.count()
        console.log(result)
        return res.json(result)
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: "Cannot connect to server"
        })
    }
}