
const  SupplierService  = require("../services/supplier.service")

exports.findAll = async (req,res,next) => {
    const suppliers = await SupplierService.findAll({attributes: {exclude:['createdAt','updatedAt']}})
    return res.send(suppliers)
}
exports.create = async (req,res,next) => {
    try {
        console.log(req.body)
        const result = await SupplierService.create(req.body.supplier)

        if (!result){
            return res.json({statusCode: 404,message: "Create supplier failed"})
        }
        return res.json({statusCode: 200,message: "Create supplier successfully"})
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: "Cannot connect to server"
        })
    }
}
exports.findOne = async (req,res,next)=> {
    try {
        const pet = await SupplierService.findOne({where:{id: req.params.id}})
        if (!pet)
            return res.json({statusCode: 404,message: "Supplier not found"})
        return res.json(pet)
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: "Cannot connect to server"
        })
    }
}
exports.update = async (req,res,next) => {
     try {
        const pet = await SupplierService.update(req.params.id, req.body)
        if (!pet)
            return res.json({statusCode: 404,message: "Supplier not found"})
        return res.json(pet)
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: "Cannot connect to server"
        })
    }
}

exports.delete = async (req,res,next) => {
    try {
        const result = await SupplierService.delete(req.params.id)
        if (!result) {
            console.log(result)
            return res.json(result)
        }
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
        const result = await SupplierService.count()
        console.log(result)
        return res.json(result)
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: "Cannot connect to server"
        })
    }
}